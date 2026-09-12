import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// const typeDefs = `#graphql
//   type Query {
//     getPet(id: Int!): Pet
//     allPets: [Pet!]!
//   }

//   type Pet {
//     name: String!
//     species: String!
//   }

//   type Mutation {
// addPet(name: String!, species: String!): Pet!
// deletePet(id: Int!): Pet!
// updatePet(id: Int!, name: String, species: String): Pet
//   }
// `;

// const petList = [
//   { name: "Fluffy", species: "Dog" },
//   { name: "Sassy", species: "Cat" },
//   { name: "Goldberg", species: "Frog" }
// ];

// const resolvers = {
//   Query: {
//     getPet: (_, { id }) => {
//       return petList[id];
//     },
//     allPets: () => {
//       return petList;
//     }
//   },
// Mutation: {
//   addPet: (_, { name, species }) => {
//     const pet = { name, species };
//     petList.push(pet);
//     return pet;
//   },
//   updatePet: (_, { id, name, species }) => {
//     const pet = petList[id];
//     if (!pet) throw new Error();

//     pet.name = name || pet.name;
//     pet.species = species || pet.species;
//     return pet;
//   },
//   deletePet: (_, { id }) => {
//     const [deletedPet] = petList.splice(id, 1);
//     return deletedPet;
//   }
// }
// };

const typeDefs = `#graphql
  type Query {
    getFruit(id: Int!): Fruit 
    allFruits: [Fruit!]!
    fruitsCount: Int!
    fruitsRange(range: Int!): [Fruit!]!
    allColors: [String!]!
    fruitsByColor(color: String!): [Fruit!]!
  }
  
  type Mutation {
    addFruit(name: String!, size: Size, color: String!): Fruit!
    deleteFruit(id: Int!): Fruit!
    updateFruit(id: Int!, name: String, size: Size, color: String): Fruit
  }
  

  enum Size {
    small
    average
    large
  }

  type Fruit {
    name: String!
    color: String!
    size: Size!
  }
`;

const fruitList = [
  { name: "Banana", color: "Yellow", size: "average" },
  { name: "Watermelon", color: "Green", size: "large" },
  { name: "Grape", color: "Red", size: "small" }
];

const resolvers = {
  Query: {
    getFruit: (_, { id }) => {
      return fruitList[id];
    },
    allFruits: () => {
      return fruitList;
    },
    fruitsCount: () => {
      return fruitList.length;
    },
    fruitsRange: (_, { range }) => {
      return fruitList.slice(0, range);
    },
    fruitsByColor: (_, { color }) => {
      return fruitList.filter((fruit) => fruit.color == color);
    },
    allColors: () => {
      return [...new Set(fruitList.map((fruit) => fruit.color))];
    }
  },
  Mutation: {
    addFruit: (_, { name, size, color }) => {
      const fruit = { name, size, color };
      fruitList.push(fruit);
      return fruit;
    },
    updateFruit: (_, { id, name, size, color }) => {
      const fruit = fruitList[id];
      if (!fruit) throw new Error();

      fruit.name = name || fruit.name;
      fruit.size = size || fruit.size;
      fruit.color = color || fruit.color;
      return fruit;
    },
    deleteFruit: (_, { id }) => {
      const [deletedFruit] = fruitList.splice(id, 1);
      return deletedFruit;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`Server ready at: ${url}`);
