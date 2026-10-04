const LEFT_LANGUAGES = [
  ["English", "6,902,000+ articles"],
  ["日本語", "1,434,000+ 記事"],
  ["Deutsch", "2,954,000+ Artikel"],
  ["中文", "1,448,000+ 条目 / 條目"],
  ["فارسی", "۱٬۰۱۷٬۰۰۰+ مقاله"]
];

const RIGHT_LANGUAGES = [
  ["Русский", "2,006,000+ статей"],
  ["Español", "1.986.000+ artículos"],
  ["Français", "2 643 000+ articles"],
  ["Italiano", "1,888,000+ voci"],
  ["Português", "1.136.000+ artigos"]
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

function LanguageList({ className, languages }) {
  return (
    <div className={className}>
      {languages.map(([name, count]) => (
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
        <LanguageList
          className="l-globe-container"
          languages={LEFT_LANGUAGES}
        />
        <img
          className="globe"
          src="/assets/logo.png"
          alt="wikipedia globe logo"
        />
        <LanguageList
          className="r-globe-container"
          languages={RIGHT_LANGUAGES}
        />
      </div>
    </div>
  );
}

export default function HomePage({ query, onQueryChange, onSubmit }) {
  return (
    <>
      <Hero />
      <form className="search-row" onSubmit={onSubmit}>
        <div className="search">
          <input
            id="search"
            type="text"
            aria-label="Search Wikipedia"
            placeholder="Search Wikipedia"
            value={query}
            onChange={onQueryChange}
          />
          <button className="search-btn" type="submit" aria-label="Search">
            <SearchIcon />
          </button>
        </div>
      </form>
    </>
  );
}
