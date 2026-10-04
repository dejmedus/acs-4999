### Wiki Rabbit Hole

Quickly go down Wikipedia rabbit holes

![Wikipedia rabbit hole with article links](./rabbithole.png)
![AllPaths query in Apollo Studio](./query.png)

#### Local Dev

```sh
cd final-project/backend
npm start
```

```sh
cd final-project/frontend
npm run dev
```

#### Apollo Queries

```graphql
query AllPaths {
  paths {
    id
    title
    startedAt
    steps {
      article {
        id
        title
        summary
        links {
          title
        }
      }
    }
  }
}
```

```graphql
# searches wikipedia
query SearchArticles($query: String!) {
  searchArticles(query: $query) {
    id
    title
  }
}
```

```graphql
query GetPath($id: ID!) {
  path(id: $id) {
    id
    title
    startedAt
    steps {
      id
      article {
        title
        summary
      }
    }
  }
}
```