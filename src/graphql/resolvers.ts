import { logger } from './../logger';
import { GraphqlContext } from './context';
import { GetGreetingResponse, Resolvers } from './generated/resolvers';
import service from '../service';

export const resolvers: Resolvers<GraphqlContext> = {
  Greeting: {
    id: ({ id }) => id,
    message: async ({ id }, _, ctx) => {
      const greeting = await ctx.greetingDataLoader.load(id);
      logger.debug({ greeting }, 'resolvers - getGreeting()');
      return greeting.message;
    },
  },
  Query: {
    getGreeting: async (_, { input }, ctx) => {
      const { id } = input;
      const result = await ctx.greetingDataLoader.load(id);
      logger.debug({ result }, 'resolvers - getGreeting()');
      return { greeting: result } as GetGreetingResponse;
    },
  },
  Mutation: {
    upsertGreeting: async (_, { input }, ctx) => {
      const { id, message } = input;
      logger.debug({ id, message }, 'resolvers - upsertGreeting()');
      const result = await service.upsertGreeting(ctx, {
        greetingUpsertInput: { id, message },
      });
      logger.debug({ result }, 'resolvers - upsertGreeting()');
      return { id, message };
    },
  },
};
