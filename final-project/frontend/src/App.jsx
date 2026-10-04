import { gql } from "@apollo/client";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";

const PATH_KEYS = gql`
  fragment PathKeys on Path {
    id
    title
    steps {
      id
      article {
        id
        title
        summary
        url
        links {
          id
          title
        }
      }
    }
  }
`;

const SEARCH_ARTICLES = gql`
  query SearchArticles($query: String!) {
    searchArticles(query: $query) {
      id
      title
    }
  }
`;

const GET_PATH = gql`
  ${PATH_KEYS}
  query GetPath($id: ID!) {
    path(id: $id) {
      ...PathKeys
    }
  }
`;

const CREATE_PATH = gql`
  ${PATH_KEYS}
  mutation CreatePath($title: String!) {
    createPath(title: $title) {
      ...PathKeys
    }
  }
`;

const ADD_STEP = gql`
  ${PATH_KEYS}
  mutation AddStep($pathId: ID!, $articleTitle: String!) {
    addStep(pathId: $pathId, articleTitle: $articleTitle) {
      ...PathKeys
    }
  }
`;

function Links({ articles, onPick, disabled }) {
  return (
    <div className="links">
      {articles.map((a) => (
        <button key={a.id} disabled={disabled} onClick={() => onPick(a.title)}>
          {a.title}
        </button>
      ))}
    </div>
  );
}

function Article({ pathId }) {
  const { loading, error, data } = useQuery(GET_PATH, {
    variables: { id: pathId }
  });
  const [addStep, { loading: adding, error: addError }] = useMutation(ADD_STEP);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const steps = data.path.steps.filter(({ article }) => article);

  return (
    <>
      {steps.map(({ id, article }, i) => (
        <section key={id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
          <a
            className="article-link"
            href={article.url}
            target="_blank"
            rel="noreferrer"
          >
            Read on Wikipedia
          </a>

          {i === steps.length - 1 && (
            <>
              <Links
                articles={article.links}
                disabled={adding}
                onPick={(articleTitle) =>
                  addStep({ variables: { pathId, articleTitle } })
                }
              />
              {addError && <p>{addError.message}</p>}
            </>
          )}
        </section>
      ))}
    </>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [pathId, setPathId] = useState(null);

  const [searchArticles, { error, data }] = useLazyQuery(SEARCH_ARTICLES);
  const [createPath, { error: createError }] = useMutation(CREATE_PATH);

  async function start(title) {
    const res = await createPath({ variables: { title } });
    setPathId(res.data.createPath.id);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    const { data } = await searchArticles({ variables: { query: q } });
    const first = data?.searchArticles[0];

    if (first) start(first.title);
  }

  if (pathId) {
    return <Article pathId={pathId} />;
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="search">Search Wikipedia</label>

        <input
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {/* {loading && <p>Searching...</p>} */}
      {(error || createError) && <p>{(error || createError).message}</p>}

      {data && !data.searchArticles.length && <p>No results found.</p>}
    </>
  );
}

export default App;
