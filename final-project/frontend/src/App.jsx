import { gql } from "@apollo/client";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";
import Article from "./components/Article";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

const SEARCH_ARTICLES = gql`
  query SearchArticles($query: String!) {
    searchArticles(query: $query) {
      id
      title
    }
  }
`;

const CREATE_PATH = gql`
  mutation CreatePath($title: String!) {
    createPath(title: $title) {
      id
    }
  }
`;

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
    return (
      <>
        <Header onHome={() => setPathId(null)} />
        <Article pathId={pathId} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <main>
        <HomePage
          query={query}
          onQueryChange={(e) => setQuery(e.target.value)}
          onSubmit={onSubmit}
        />

        {/* {loading && <p>Searching...</p>} */}
        {(error || createError) && (
          <p className="status">{(error || createError).message}</p>
        )}

        {data && !data.searchArticles.length && (
          <p className="status">No results found.</p>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
