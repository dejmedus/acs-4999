import { useState } from "react";
import { gql } from "@apollo/client";
import { client } from "./apolloClient";

function App() {
  const [zip, setZip] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  async function getWeather() {
    try {
      const json = await client.query({
        query: gql`
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
        `,
        variables: { zip: parseInt(zip, 10) }
      });

      const { message } = json.data.getWeather;
      setError(message ?? null);
      setWeather(json.data.getWeather);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="weather-app">
      <Weather weather={weather} error={error} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          getWeather();
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
function Weather({ weather, error }) {
  return (
    <div className="weather-card">
      {error && <p className="error">{error}</p>}
      {weather ? (
        <ul className="weather">
          <li className="location">{weather.name}</li>
          <li className="temp">{weather.temperature}°</li>
          <li className="desc">
            {weather.description} · feels like {weather.feels_like}°
          </li>
        </ul>
      ) : (
        <p className="placeholder">Search for weather data</p>
      )}
    </div>
  );
}
