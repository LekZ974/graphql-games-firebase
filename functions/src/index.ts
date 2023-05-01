import path from 'path';
import resolvers from './resolvers';
import { SchemaTools } from './tools/SchemaTools';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

admin.initializeApp()
const app = express();
// Will initialize with default settings and database

async function startServer() {
  const server = new ApolloServer({ typeDefs: [SchemaTools.loadSchemas(path.join(__dirname, '/schemas'))], resolvers });

  await server.start();
  server.applyMiddleware({ app, path: '/' })
}

startServer();
exports.graphql = functions.https.onRequest(app);

