import { gql } from 'apollo-server';

const typeDefs = gql`
  type Subarea {
    id: ID!
    name: String!
    tag: String!
    sector: String!
    local: String!
    observations: String!
  }

  type Query {
    subareas: [Subarea!]!
  }

  type Mutation {
    createSubarea(
      name: String!
      tag: String!
      sector: String!
      local: String!
      observations: String!
    ): Subarea
  }
`;

export default typeDefs;
