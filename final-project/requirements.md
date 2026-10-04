### Requirements

#### Server

- [x] Apollo Server 5* with ESM (`import`/`export`, `"type": "module"` in package.json)
- [x] At least **3 GraphQL types** (not counting `Query` and `Mutation`)
- [x] At least **1 relationship** between types — implemented with a nested resolver
- [x] At least **2 queries** (e.g. get one by ID, get all)
- [x] At least **2 mutations** (e.g. create + update or delete)
- [x] At least one query accepts an **argument** (e.g. `book(id: ID!)`)

#### Client

- [x] React + Vite with Apollo Client
- [x] `ApolloProvider` wraps the app in `main.jsx`
- [x] At least one query uses **variables** (not hardcoded values)
- [x] Uses `useLazyQuery` or `useQuery` with variables
- [x] At least one mutation fires from the UI (form submit, button click, etc.)
- [x] Loading and error states handled — UI doesn't crash or show blank screen

#### Code Quality

- [x] `.gitignore` includes `node_modules` and `.env`
- [x] No API keys committed to GitHub
- [x] Schema makes sense — types and fields are named clearly
- [x] Resolver structure matches schema (one resolver key per type that has nested fields)
