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
    dessertsByIngredients(ingredientNames: [String!]!): [Product!]!,
    cocktailsByIngredients(ingredientNames: [String!]!): [Product!]!,
    kutchensByIngredients(ingredientNames: [String!]!): [Product!]!
  }
`;

const getProductsByIngredients = (_, { ingredientNames }) => {
  console.log("getProductsByIngredients", ingredientNames)
  const HOST = process.env.PASTELERIA_PRODUCTS_API || "http://localhost:9000"
  const URL = `${HOST}/api/v1.0/products?ingredients=${ingredientNames.join(',')}`
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
  const URL = `${HOST}/api/v1.0/products/cakes?ingredients=${ingredientNames.join(',')}`
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
  const URL = `${HOST}/api/v1.0/products/desserts?ingredients=${ingredientNames.join(',')}`
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

const getCocktailsByIngredients = (_, { ingredientNames }) => {
  console.log("getCocktailsByIngredients", ingredientNames)
  const HOST = process.env.PASTELERIA_PRODUCTS_API || "http://localhost:9000"
  const URL = `${HOST}/api/v1.0/products/cocktails?ingredients=${ingredientNames.join(',')}`
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

const getKutchensByIngredients = (_, { ingredientNames }) => {
  console.log("getCocktailsByIngredients", ingredientNames)
  const HOST = process.env.PASTELERIA_PRODUCTS_API || "http://localhost:9000"
  const URL = `${HOST}/api/v1.0/products/kutchens?ingredients=${ingredientNames.join(',')}`
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
    dessertsByIngredients: getDessertsByIngredients,
    cocktailsByIngredients: getCocktailsByIngredients,
    kutchensByIngredients: getKutchensByIngredients
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
