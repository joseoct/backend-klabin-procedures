import { ApolloServer } from 'apollo-server';
import typeDefs from './schemas/schema.gql';
import resolvers from './resolvers/resolver';

import '../../typeorm';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
