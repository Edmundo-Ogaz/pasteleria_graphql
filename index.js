const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const dotenv = require('dotenv');
dotenv.config();

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Int!
    image: String!
    category: String!
    dispatch: String!
    ingredients: [String!]!
    portions: String!
  }

  type Query {
    health: String
    productsByIngredients(ingredientNames: [String!]!): [Product!]!,
    cakesByIngredients(ingredientNames: [String!]!): [Product!]!,
    dessertsByIngredients(ingredientNames: [String!]!): [Product!]!
  }
`;

const getProductsByIngredients = (_, { ingredientNames }) => {
  console.log("getProductsByIngredients", ingredientNames)
  const HOST = process.env.PASTELERIA_PRODUCTS_API || "http://localhost:9000"
  const URL = `${HOST}/v2/productos?ingredientes=${ingredientNames.join(',')}`
  console.log("URL", URL)
  return fetch(URL)
    .then(response => response.json())
    .then(data => {
      console.log("data", data)
      return data
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    });
}

const getCakesByIngredients = (_, { ingredientNames }) => {
  console.log("getCakesByIngredients", ingredientNames)
  const HOST = process.env.PASTELERIA_PRODUCTS_API || "http://localhost:9000"
  const URL = `${HOST}/v2/productos/tortas?ingredientes=${ingredientNames.join(',')}`
  console.log("URL", URL)
  return fetch(URL)
    .then(response => response.json())
    .then(data => {
      console.log("data", data)
      return data
    })
    .catch(error => {
      console.error('Error fetching cakes:', error);
      throw new Error('Failed to fetch cakes');
    });
}

const getDessertsByIngredients = (_, { ingredientNames }) => {
  console.log("getDessertsByIngredients", ingredientNames)
  const HOST = process.env.PASTELERIA_PRODUCTS_API || "http://localhost:9000"
  const URL = `${HOST}/v2/productos/postres?ingredientes=${ingredientNames.join(',')}`
  console.log("URL", URL)
  return fetch(URL)
    .then(response => response.json())
    .then(data => {
      console.log("data", data)
      return data
    })
    .catch(error => {
      console.error('Error fetching desserts:', error);
      throw new Error('Failed to fetch desserts');
    });
}

const resolvers = {
  Query: {
    health: () => `OK`,
    productsByIngredients: getProductsByIngredients,
    cakesByIngredients: getCakesByIngredients,
    dessertsByIngredients: getDessertsByIngredients
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`🚀 Server listo en http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();
