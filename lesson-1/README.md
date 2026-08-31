### Lesson 1: GraphQL Intro

1. Get Rick Sanchez's name and status.

```graphql
{
  character(id: 1) {
    name
    status
  }
}
```

```json
{
  "data": {
    "character": {
      "name": "Rick Sanchez",
      "status": "Alive"
    }
  }
}
```

2. Get Morty Smith's name, species, and gender.

```graphql
{
  character(id: 2) {
    name
    species
    gender
  }
}
```

```json
{
  "data": {
    "character": {
      "name": "Morty Smith",
      "species": "Human",
      "gender": "Male"
    }
  }
}
```

3. Get Summer Smith's name and the name of her current location.


```graphql
{
  character(id: 3) {
    name
    location {
      name
    }
  }
}
```

```json
{
  "data": {
    "character": {
      "name": "Summer Smith",
      "location": {
        "name": "Earth (Replacement Dimension)"
      }
    }
  }
}
```

4. Get the total count of all characters. (Hint: try characters { info { count } })

```graphql
{
  characters {
    info {
      count
    }
  }
}
```

```json
{
  "data": {
    "characters": {
      "info": {
        "count": 826
      }
    }
  }
}
```


5. Get the name and air date of episode 1.

```graphql
{
  episode(id: 1) {
    name
    air_date
  }
}
```

```json
{
  "data": {
    "episode": {
      "name": "Pilot",
      "air_date": "December 2, 2013"
    }
  }
}
```


6. Get Rick's name and the name of his origin location.


```graphql
{
  character(id: 1) {
    name
    origin {
      name
    }
  }
}
```

```json
{
  "data": {
    "character": {
      "name": "Rick Sanchez",
      "origin": {
        "name": "Earth (C-137)"
      }
    }
  }
}
```

7. Get the dimension of Rick's origin location.


```graphql
{
  character(id: 1) {
    origin {
      dimension
    }
  }
}
```

```json
{
  "data": {
    "character": {
      "origin": {
        "dimension": "Dimension C-137"
      }
    }
  }
}
```


8. Get both Rick and Morty's names and species using a single query. Use aliases!


```graphql
{
  rick: character(id: 1) {
    name
    species
  }
  morty: character(id: 2) {
    name
    species
  }
}
```

```json
{
  "data": {
    "rick": {
      "name": "Rick Sanchez",
      "species": "Human"
    },
    "morty": {
      "name": "Morty Smith",
      "species": "Human"
    }
  }
}
```


9. Get both Rick's origin location name and Morty's origin location name using a single query. 
Use aliases!


```graphql
{
  rick: character(id: 1) {
    origin {
      name
    }
  }
  morty: character(id: 2) {
    origin {
      name
    }
  }
}
```

```json
{
  "data": {
    "rick": {
      "origin": {
        "name": "Earth (C-137)"
      }
    },
    "morty": {
      "origin": {
        "name": "unknown"
      }
    }
  }
}
```


10. Get the names of the first 3 residents of the Citadel of Ricks. (Hint: try location(id: 3) { residents { name } })


```graphql
{
  location(id: 3) {
    residents {
      name
    }
  }
}
```

```json
{
  "data": {
    "location": {
      "residents": [
        {
          "name": "Rick Sanchez"
        },
        {
          "name": "Morty Smith"
        },
        {
          "name": "Adjudicator Rick"
        }
      ]
    }
  }
}
```

