const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const dotenv = require('dotenv');
dotenv.config();

function fetchWithRetries(url, retries = 3, delay = 2000) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            if ((response.status === 502 || response.status === 503) && n > 0) {
              console.warn(`Intento fallido (${response.status}). Reintentando en ${delay} ms...`);
              setTimeout(() => attempt(n - 1), delay);
            } else {
              console.error(`Error HTTP: ${response.status}`);
              response.text().then(text => console.error(text));
              reject(new Error(`Failed with status ${response.status}`));
            }
          } else {
            return response.json().then(data => {
              console.log("data", data);
              resolve(data);
            });
          }
        })
        .catch(error => {
          if (n > 0) {
            console.warn(`Error de red: ${error}. Reintentando en ${delay} ms...`);
            setTimeout(() => attempt(n - 1), delay);
          } else {
            console.error('Error definitivo al hacer fetch:', error);
            reject(new Error('Failed to fetch cakes after retries'));
          }
        });
    };

    attempt(retries);
  });
}


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
  return fetchWithRetries(URL)
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
  return fetchWithRetries(URL)
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
  return fetchWithRetries(URL)
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
  return fetchWithRetries(URL)
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
  return fetchWithRetries(URL)
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
