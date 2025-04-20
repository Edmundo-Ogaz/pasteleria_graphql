const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

products_data = [
    {
      "name": "TORTA CIRUELA ESPECIAL",
      "price": "$29.000",
      "image": "https://pastelerialapalmera.cl/wp-content/uploads/2021/02/torta_ciruela_especial_pasteleria_la_palmera.jpg",
      "category": "Tortas",
      "dispatch": "True",
      "ingredients": [
        "BIZCOCHO DE CIRUELA",
        "RELLENA DE MANJAR",
        "RELLENA DE MERMELADA DE CIRUELA",
        "NUEZ",
        "CREMA CHANTILLY DE CHOCOLATE Y CUBIERTA DE MERENGUE"
      ],
      "portions": "",
      "id": 3
    }
]

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
    hello: String,
    products: [Product!]!
  }
`;

// 2. Definir los resolvers
const resolvers = {
  Query: {
    hello: () => '¡Hola desde GraphQL!',
    products: () => products_data,    
  },
};

// 3. Crear el servidor Apollo
async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () =>
    console.log(`🚀 Server listo en http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();
