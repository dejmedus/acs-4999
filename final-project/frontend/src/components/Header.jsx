export default function Header({ onHome }) {
  return (
    <header className="site-header">
      <span className="rabbit">🐰</span>
      <button className="home-link" onClick={onHome}>
        W<span className="wordmark-small">IKIPEDI</span>A
      </button>
    </header>
  );
}
