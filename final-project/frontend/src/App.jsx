import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { useState } from "react";

const SEARCH_ARTICLES = gql`
  query SearchArticles($query: String!) {
    searchArticles(query: $query) {
      id
      title
    }
  }
`;

function App() {
  const [query, setQuery] = useState("");

  const [searchArticles, { loading, error, data }] =
    useLazyQuery(SEARCH_ARTICLES);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          searchArticles({ variables: { query } });
        }}
      >
        <label htmlFor="search">Search Wikipedia</label>

        <input
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {loading && <p>Searching...</p>}

      {error && <p>{error.message}</p>}

      {data?.searchArticles.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  );
}

export default App;
