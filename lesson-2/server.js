import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// const typeDefs = `#graphql
//   type About {
//     message: String!
//   }

//   enum MealTime {
//     breakfast
//     lunch
//     dinner
//   }

//   type Query {
//     getAbout: About
//     getmeal(time: MealTime!): Meal
//     getPet(id: Int!): Pet
//     allPets: [Pet!]!
//   }

//   type Meal {
//     description: String!
//   }

//   type Pet {
//     name: String!
//     species: String!
//   }
// `;

// const petList = [
//   { name: "Fluffy", species: "Dog" },
//   { name: "Sassy", species: "Cat" },
//   { name: "Goldberg", species: "Frog" }
// ];

// const resolvers = {
//   Query: {
//     getAbout: () => {
//       return { message: "Hello World" };
//     },
//     // resolvers receive parent, args, context, info
//     // we can destructure the args as { time }
//     getmeal: (_, { time }) => {
//       const allMeals = {
//         breakfast: "toast",
//         lunch: "noodles",
//         dinner: "pizza"
//       };
//       return { description: allMeals[time] };
//     },
//     getPet: (_, { id }) => {
//       return petList[id];
//     },
//     allPets: () => {
//       return petList;
//     }
//   }
// };

const typeDefs = `#graphql
  type Query {
    getFruit(id: Int!): Fruit 
    allFruits: [Fruit!]!
    fruitsCount: Int!
    fruitsRange(range: Int!): [Fruit!]!
    allColors: [String!]!
    fruitsByColor(color: String!): [Fruit!]!
    getTime: Time
    getRandom(range: Int): Int
    getRoll(sides: Int!, rolls: Int!): Dice
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

    type Time {
    hour: Int!
    minute: Int!
    second: Int!
    }

    type Dice  {
    total: Int!, 
    sides: Int!,
    rolls: [Int!]!
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
    },
    getTime: () => {
      const now = new Date();
      return {
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
      };
    },
    getRandom: (_, { range }) => {
      return Math.floor(Math.random() * range);
    },
    getRoll(_, { sides, rolls }) {
      let total = 0;
      const rollArr = [];
      for (let roll = 0; roll < rolls; roll++) {
        const face = Math.floor(Math.random() * sides) + 1;
        total += face;
        rollArr.push(face);
      }
      return { total, sides, rolls: rollArr };
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`Server ready at: ${url}`);
