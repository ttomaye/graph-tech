import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import playgroundMiddleware from 'graphql-playground-middleware-express';

import { getResolvers } from './resolvers';
import { getTypeDefs } from './schema';

const startServer = async () => {
  const app = Express();

  const typeDefs = await getTypeDefs();
  const resolvers = await getResolvers();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  app.get(
    '/playground',
    playgroundMiddleware({
      endpoint: '/graphql',
      env: process.env,
      workspaceName: 'Example App',
    })
  );

  app
    .listen(4000)
    .once('listening', () => {
      console.log('🚀 Server is ready at http://localhost:4000/graphql');
      console.log(
        '🚀 GQL Playground is ready at http://localhost:4000/playground'
      );
    })
    .once('error', (err: any): void => {
      console.error('💀 Error starting the node server', err);
    });
};

startServer();
