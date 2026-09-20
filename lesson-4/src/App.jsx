import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { useState } from "react";

const GET_WEATHER = gql`
  query GetWeather($zip: Int!) {
    getWeather(zip: $zip) {
      name
      temperature
      feels_like
      description
      cod
      message
    }
  }
`;

function App() {
  const [zip, setZip] = useState("");
  const [getWeather, { loading, error, data }] = useLazyQuery(GET_WEATHER);

  return (
    <div className="weather-app">
      <Weather
        weather={data?.getWeather}
        loading={loading}
        error={error?.message}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          getWeather({ variables: { zip: Number(zip), units: "metric" } });
        }}
      >
        <label htmlFor="zip">Zip code</label>
        <input
          id="zip"
          inputMode="numeric"
          pattern="[0-9]*"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;

function Weather({ weather, loading, error }) {
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
