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

export default function Footer() {
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
