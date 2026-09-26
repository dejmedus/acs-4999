import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { useState } from "react";

import Weather from "./components/Weather";

const GET_WEATHER = gql`
  query GetWeather($zip: Int!, $units: Units!) {
    getWeather(zip: $zip, units: $units) {
      name
      temperature
      feels_like
      description
      cod
      message
    }
  }
`;

const Units = {
  c: "metric",
  f: "imperial"
};

function App() {
  const [zip, setZip] = useState("");
  const [unit, setUnit] = useState(Units.c);
  const [getWeather, { loading, error, data }] = useLazyQuery(GET_WEATHER);

  return (
    <div className="weather-app">
      <Weather
        weather={data?.getWeather}
        loading={loading}
        error={error?.message}
        unit={unit === Units.c ? "C" : "F"}
        toggleUnit={() => setUnit((u) => (u === Units.c ? Units.f : Units.c))}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          getWeather({ variables: { zip: Number(zip), units: unit } });
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
      </form>
    </div>
  );
}

export default App;
