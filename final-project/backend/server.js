import fs from "fs";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";

const typeDefs = fs.readFileSync(
  new URL("./schema.graphql", import.meta.url),
  "utf-8"
);

const resolvers = {
  Query: {
    searchArticles: async (_, { query }) => {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          query
        )}&format=json&origin=*`
      );

      const data = await response.json();

      return data.query.search.map((article) => ({
        id: article.pageid,
        title: article.title
      }));
    },

    article: async (_, { title }) => {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          title
        )}`
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      return {
        id: data.pageid,
        title: data.title,
        summary: data.extract,
        url: data.content_urls.desktop.page
      };
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const clientName = req.headers["x-client-name"] || "unknown";

    return {
      requestTime: new Date().toISOString(),
      clientName
    };
  }
});

console.log(`Server ready at: ${url}`);
