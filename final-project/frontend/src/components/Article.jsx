import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const PATH_FIELDS = gql`
  fragment PathFields on Path {
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

const GET_PATH = gql`
  ${PATH_FIELDS}
  query GetPath($id: ID!) {
    path(id: $id) {
      ...PathFields
    }
  }
`;

const ADD_STEP = gql`
  ${PATH_FIELDS}
  mutation AddStep($pathId: ID!, $articleTitle: String!) {
    addStep(pathId: $pathId, articleTitle: $articleTitle) {
      ...PathFields
    }
  }
`;

function Links({ articles, onPick, disabled }) {
  return (
    <div className="links">
      {articles.map((article) => (
        <button
          key={article.id}
          disabled={disabled}
          onClick={() => onPick(article.title)}
        >
          {article.title}
        </button>
      ))}
    </div>
  );
}

export default function Article({ pathId }) {
  const { loading, error, data } = useQuery(GET_PATH, {
    variables: { id: pathId },
    errorPolicy: "all"
  });
  const [addStep, { loading: adding, error: addError }] = useMutation(ADD_STEP);

  if (loading) return <p className="status">Loading...</p>;
  if (error && !data) return <p className="status">{error.message}</p>;

  const steps = data.path.steps.filter(({ article }) => article);

  return (
    <main className="article-page">
      {steps.map(({ id, article }, index) => (
        <section className="step" key={id}>
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

          {index === steps.length - 1 && (
            <>
              <Links
                articles={article.links}
                disabled={adding}
                onPick={(articleTitle) =>
                  addStep({ variables: { pathId, articleTitle } })
                }
              />
              {addError && <p className="status">{addError.message}</p>}
            </>
          )}
        </section>
      ))}
    </main>
  );
}
