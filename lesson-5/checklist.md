## Checklist 

### Server 

- [x] Apollo Server starts with `npm start` at `http://localhost:4000`
- [x] Apollo Sandbox loads at `http://localhost:4000`
- [x] `getWeather(zip: 94122, units: imperial)` returns temperature and description
- [x] `getWeather` accepts a `units` enum (`standard`, `metric`, `imperial`)
- [x] Server returns `temperature`, `description`, `feels_like`, `temp_min`, `temp_max`, `pressure`, `humidity`
- [x]Server returns `cod` and `message` when an invalid zip is provided
- [x] `.env` file exists with `OPENWEATHERMAP_API_KEY` set
- [x] `.gitignore` includes both `node_modules` and `.env`

<!-- > -->

### Client 

- [x] Vite React app starts with `npm run dev` at `http://localhost:5173`
- [x] `src/apolloClient.js` exists and exports `client` with `uri: 'http://localhost:4000/'`
- [x] `src/main.jsx` wraps `<App>` in `<ApolloProvider>`
- [x] Weather component has a form with a zip code input
- [x] Submitting the form calls the GraphQL server and loads weather data
- [x] Weather data displays after a successful query
- [x] Invalid zip code shows an error message (not a crash)
- [x] A dedicated component displays the weather data (receives data as props)

<!-- > -->

## Challenges

- **Challenge 5** — Handle data with conditional rendering ✔
- **Challenge 6** — Make a component to display the weather  ✔
- **Challenge 7** — Handle errors (invalid zip) ✔
- **Challenge 8** — Style your work
- **Challenge 9** — Use units (radio buttons for metric/imperial)
- **Challenge 10** — Get current location from the browser
- **Challenge 11** — Add weather-by-location to your GraphQL API
- **Challenge 12** — Fetch weather by geolocation from React
