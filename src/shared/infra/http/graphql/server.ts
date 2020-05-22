import { ApolloServer } from 'apollo-server';

import subareaSchema from '@modules/subareas/infra/http/graphql/schemas/subarea.schema';
import subareaResolver from '@modules/subareas/infra/http/graphql/resolvers/subarea.resolver';

import '../../typeorm';

const server = new ApolloServer({
  typeDefs: subareaSchema,
  resolvers: subareaResolver,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
