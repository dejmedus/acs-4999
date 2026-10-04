import fs from "fs";
import { randomUUID } from "node:crypto";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import "dotenv/config";

const typeDefs = fs.readFileSync(
  new URL("./schema.graphql", import.meta.url),
  "utf-8"
);

const WIKI = "https://en.wikipedia.org";

async function searchWiki(search, limit = 10) {
  const params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: search,
    srlimit: String(limit),
    format: "json",
    origin: "*"
  });
  const res = await fetch(`${WIKI}/w/api.php?${params}`);

  const data = await res.json();
  return (data.query?.search ?? []).map(({ pageid, title }) => ({
    id: pageid,
    title
  }));
}

async function fetchArticle(title) {
  const res = await fetch(
    `${WIKI}/api/rest_v1/page/summary/${encodeURIComponent(title)}`
  );
  if (!res.ok) return null;

  const data = await res.json();
  return {
    id: data.pageid,
    title: data.title,
    summary: data.extract,
    url: data.content_urls.desktop.page
  };
}

async function fetchLinks(title, limit = 12) {
  const res = await fetch(
    `${WIKI}/api/rest_v1/page/html/${encodeURIComponent(title)}`
  );
  if (!res.ok) return [];

  const html = await res.text();
  const links = new Set();

  paragraphs: for (const [, paragraph] of html.matchAll(
    /<p[^>]*>([\s\S]*?)<\/p>/g
  )) {
    for (const [, href] of paragraph.matchAll(/<a[^>]+href="\.\/([^"#?]+)"/g)) {
      const linkTitle = decodeURIComponent(href).replaceAll("_", " ");
      const isYear = /^\d{1,4}$/.test(linkTitle);
      const notProperTitle =
        links.has(linkTitle) ||
        linkTitle === title ||
        linkTitle.includes(":") ||
        isYear;

      if (notProperTitle) {
        continue;
      }

      links.add(linkTitle);

      if (links.size >= limit) break paragraphs;
    }
  }
  return [...links].map((title) => ({ id: title, title }));
}

const paths = new Map();

function addStepTo(path, articleTitle) {
  path.steps.push({
    id: `${path.id}-${path.steps.length + 1}`,
    articleTitle
  });
}

const resolvers = {
  Query: {
    searchArticles: (_, { query }) => searchWiki(query),
    article: (_, { title }) => fetchArticle(title),
    paths: () => [...paths.values()],
    path: (_, { id }) => paths.get(id) ?? null
  },

  Mutation: {
    createPath: (_, { title }) => {
      const path = {
        id: randomUUID(),
        title,
        startedAt: new Date().toISOString(),
        steps: []
      };
      addStepTo(path, title);
      paths.set(path.id, path);
      return path;
    },

    addStep: (_, { pathId, articleTitle }) => {
      const path = paths.get(pathId);
      if (!path) throw new GraphQLError("Path not found");
      addStepTo(path, articleTitle);
      return path;
    },

    deletePath: (_, { id }) => paths.delete(id)
  },

  PathNode: {
    article: ({ articleTitle }) => fetchArticle(articleTitle)
  },

  Article: {
    links: ({ title }) => fetchLinks(title)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`Server ready at: ${url}`);
