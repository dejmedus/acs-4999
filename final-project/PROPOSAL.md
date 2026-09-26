### Wikipedia Rabbit Hole Tracker

Make note of interesting Wikipedia rabbit holes

#### Types and fields

```graphql
type Article {
  id: ID!
  title: String!
  summary: String!
  url: String!
  relatedArticles: [Article!]!
}

type Path {
  id: ID!
  title: String!
  steps: [PathNode!]!
}

type PathNode {
  id: ID!
  article: Article!
  createdAt: String!
}
```

#### Relationships

- Article → [Article] (each article has many related articles)
- Path → [PathNode] (each path has many nodes)
- PathNode → Article (each path node has an article)

#### Queries

```
type Query {
  getArticle(id: ID!): Article
  searchArticles(query: String!): [Article!]!
  getPaths: [Path!]!
  getPath(id: ID!): Path
}
```

#### Mutations

```
type Mutation {
  createPath(title: String!): Path!
  addNode(
    pathId: ID!
    articleTitle: String!
  ): Path!
  deletePath(id: ID!): Boolean!
}
```
