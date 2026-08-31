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
      setError(message);

      setWeather(json.data.getWeather);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="Weather">
      <h2>
        {error}
        {weather ? (
          <>
            {weather.name} {weather.temperature} {weather.description}
            {weather.feels_like}
          </>
        ) : (
          "Search for weather data"
        )}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          getWeather();
        }}
      >
        <label>Zip code</label>
        <input value={zip} onChange={(e) => setZip(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
