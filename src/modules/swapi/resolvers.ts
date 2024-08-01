import { Context } from "apollo-server-core";
import { GraphQLFieldResolver } from "graphql";

type Args = { id: string };

const Query: Record<string, GraphQLFieldResolver<{}, Context, any>> = {
  StarWarsCharacter: async (_, args: Args, ctx) => {
    return {};
  },
};

const StarWarsCharacter = {
  name: () => {
    return "test";
  },
  height: () => {
    return "171";
  },
  mass: () => {
    return "100";
  },
  gender: () => {
    return "MALE";
  },
};

// You can add new Object Resolvers to the default export and the server will pick them up automatically
export default {
  Query,
  StarWarsCharacter,
};
