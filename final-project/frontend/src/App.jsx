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

const L_LANGS = [
  ["English", "6,902,000+ articles"],
  ["日本語", "1,434,000+ 記事"],
  ["Deutsch", "2,954,000+ Artikel"],
  ["中文", "1,448,000+ 条目 / 條目"],
  ["فارسی", "۱٬۰۱۷٬۰۰۰+ مقاله"]
];

const R_LANGS = [
  ["Русский", "2,006,000+ статей"],
  ["Español", "1.986.000+ artículos"],
  ["Français", "2 643 000+ articles"],
  ["Italiano", "1,888,000+ voci"],
  ["Português", "1.136.000+ artigos"]
];

const PROJECTS = [
  [
    "Commons",
    "https://commons.wikimedia.org",
    "Free media collection",
    "commons.png"
  ],
  [
    "Wikivoyage",
    "https://www.wikivoyage.org",
    "Free travel guide",
    "wikivoyage.png"
  ],
  [
    "Wiktionary",
    "https://www.wiktionary.org",
    "Free dictionary",
    "wiktionary.png"
  ],
  ["Wikibooks", "https://www.wikibooks.org", "Free textbooks", "wikibooks.png"],
  ["Wikinews", "https://www.wikinews.org", "Free news source", "wikinews.png"],
  [
    "Wikidata",
    "https://www.wikidata.org",
    "Free knowledge base",
    "wikidata.png"
  ],
  [
    "Wikiversity",
    "https://www.wikiversity.org",
    "Free learning resources",
    "wikiversity.png"
  ],
  [
    "Wikiquote",
    "https://www.wikiquote.org",
    "Free quote compendium",
    "wikiquote.png"
  ],
  [
    "MediaWiki",
    "https://www.mediawiki.org",
    "Free & open wiki software",
    "mediawiki.jpeg"
  ],
  [
    "Wikisource",
    "https://www.wikisource.org",
    "Free content library",
    "wikisource.png"
  ],
  [
    "Wikispecies",
    "https://www.species.wikimedia.org",
    "Free species directory",
    "wikispecies.png"
  ],
  [
    "Wikifunctions",
    "https://www.wikifunctions.org",
    "Free function library",
    "wikifunctions.png"
  ],
  [
    "Meta-Wiki",
    "https://meta.wikimedia.org",
    "Community coordination & documentation",
    "logo.png"
  ]
];

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    </svg>
  );
}

function LanguageList({ className, langs }) {
  return (
    <div className={className}>
      {langs.map(([name, count]) => (
        <div className="language-link" key={name}>
          <span>{name}</span>
          {count}
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div className="hero-title">
        <h1>
          W<span className="wordmark-small">🥕KIPEDI</span>A
        </h1>
        <h2>Rabbit Hole</h2>
      </div>

      <div className="globe-container">
        <LanguageList className="l-globe-container" langs={L_LANGS} />
        <img
          className="globe"
          src="/assets/logo.png"
          alt="wikipedia globe logo"
        />
        <LanguageList className="r-globe-container" langs={R_LANGS} />
      </div>
    </div>
  );
}

function Header({ onHome }) {
  return (
    <header className="site-header">
      {/* <img className="icon" src="/assets/wikilogo.png" alt="" /> */}
      <span className="rabbit">🐰</span>
      <button className="home-link" onClick={onHome}>
        W<span className="wordmark-small">IKIPEDI</span>A{" "}
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-about">
          <div className="footer-card">
            <img
              className="icon footer-card-icon"
              src="/assets/wikimedia.png"
              alt="wikimedia logo"
            />
            <p>
              Wikipedia is hosted by the Wikimedia Foundation, a non-profit
              organization that also hosts a range of other projects.{" "}
              <a href="https://donate.wikimedia.org">
                You can support our work with a donation.
              </a>
            </p>
          </div>
        </div>

        <div className="footer-links">
          {PROJECTS.map(([name, url, blurb, icon]) => (
            <div className="link" key={name}>
              <img className="icon" src={`/assets/${icon}`} alt="" />
              <div className="link-text">
                <a href={url}>{name}</a>
                <p className="tiny-text">{blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="copyright">
        <p>Article text is available under the</p>
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">
          Creative Commons Attribution-ShareAlike License
        </a>
        <span>•</span>
        <a href="https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use">
          Terms of Use
        </a>
        <span>•</span>
        <a href="https://foundation.wikimedia.org/wiki/Policy:Privacy_policy">
          Privacy Policy
        </a>
      </div> */}
    </footer>
  );
}

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
    variables: { id: pathId },
    errorPolicy: "all"
  });
  const [addStep, { loading: adding, error: addError }] = useMutation(ADD_STEP);

  if (loading) return <p className="status">Loading...</p>;
  if (error && !data) return <p className="status">{error.message}</p>;

  const steps = data.path.steps.filter(({ article }) => article);

  return (
    <main className="article-page">
      {steps.map(({ id, article }, i) => (
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

          {i === steps.length - 1 && (
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
        <Hero />

        <form className="search-row" onSubmit={onSubmit}>
          <div className="search">
            <input
              id="search"
              type="text"
              aria-label="Search Wikipedia"
              placeholder="Search Wikipedia"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-btn" type="submit" aria-label="Search">
              <SearchIcon />
            </button>
          </div>
        </form>

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
