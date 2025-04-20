const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const products_data = [
    { id: '1', nombre: 'Torta de chocolate', precio: 15000, disponible: true },
    { id: '2', nombre: 'Cheesecake de maracuyá', precio: 18000, disponible: false },
    { id: '3', nombre: 'Kuchen de manzana', precio: 12000, disponible: true },
  ];

const typeDefs = gql`
  type Product {
    id: ID!
    nombre: String!
    precio: Int!
    disponible: Boolean!
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
