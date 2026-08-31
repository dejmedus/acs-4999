import fs from "fs";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";

const apikey = process.env.OPENWEATHERMAP_API_KEY;

const typeDefs = fs.readFileSync(
  new URL("./schema.graphql", import.meta.url),
  "utf-8"
);

const resolvers = {
  Query: {
    getWeather: async (_, { zip, units = "metric" }) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${units}`;
      const res = await fetch(url);
      const json = await res.json();

      return {
        id: json.id,
        name: json.name,
        cod: json.cod,
        message: json.message,
        temperature: json.main?.temp,
        description: json.weather?.[0]?.description,
        feels_like: json.main?.feels_like,
        temp_min: json.main?.temp_min,
        temp_max: json.main?.temp_max,
        pressure: json.main?.pressure,
        humidity: json.main?.humidity
      };
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`Server ready at: ${url}`);
