export default function Weather({ weather, loading, error }) {
  const message = error || weather?.message;

  return (
    <div className="weather-card">
      {loading && <p>Loading...</p>}
      {message && <p className="error">{message}</p>}
      {weather && !weather.message ? (
        <ul className="weather">
          <li className="location">{weather.name}</li>
          <li className="temp">{weather.temperature}°</li>
          <li className="desc">
            {weather.description} · feels like {weather.feels_like}°
          </li>
        </ul>
      ) : (
        !loading &&
        !message && <p className="placeholder">Search for weather data</p>
      )}
    </div>
  );
}
