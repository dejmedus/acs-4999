import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Query {
    getPet(id: Int!): Pet
    allPets: [Pet!]!
  }

  type Pet {
    name: String!
    species: String!
  }

  type Mutation {
    addPet(name: String!, species: String!): Pet!
    deletePet(id: Int!): Pet!
    updatePet(id: Int!, name: String, species: String): Pet
  }
`;

const petList = [
  { name: "Fluffy", species: "Dog" },
  { name: "Sassy", species: "Cat" },
  { name: "Goldberg", species: "Frog" }
];

const resolvers = {
  Query: {
    getPet: (_, { id }) => {
      return petList[id];
    },
    allPets: () => {
      return petList;
    }
  },
  Mutation: {
    addPet: (_, { name, species }) => {
      const pet = { name, species };
      petList.push(pet);
      return pet;
    },
    updatePet: (_, { id, name, species }) => {
      const pet = petList[id];
      if (!pet) throw new Error();

      pet.name = name || pet.name;
      pet.species = species || pet.species;
      return pet;
    },
    deletePet: (_, { id }) => {
      const [deletedPet] = petList.splice(id, 1);
      return deletedPet;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`Server ready at: ${url}`);
