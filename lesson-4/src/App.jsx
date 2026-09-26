import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { useState } from "react";

import Weather from "./components/Weather";

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
