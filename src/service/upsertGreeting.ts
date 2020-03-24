import { logger } from './../logger';
import { Context, Greeting } from './types';
import { MongoGreetingStore } from '../store/greeting';
import { ServiceFunction } from '../lib/service';

export interface GreetingUpsertInput {
  id: string;
  message: string;
}

export interface Input {
  greetingUpsertInput: GreetingUpsertInput;
}
export interface Output {
  Greeting: Greeting;
}

const store = new MongoGreetingStore();

export const upsertGreeting: ServiceFunction<Context, Input, Output> = async (
  ctx: Context,
  input: Input
) => {
  validate(input);

  const { greetingUpsertInput } = input;
  const { id, message } = greetingUpsertInput;
  logger.debug({ greetingUpsertInput }, 'service - upsertGreeting()');

  if (!greetingUpsertInput) {
    return;
  }

  const Greeting = await store.upsertGreeting(id, message);
  logger.debug({ Greeting }, 'service - upsertGreeting()');

  return { Greeting };
};

const validate = (input: Input) => {
  const { greetingUpsertInput } = input;
  if (!greetingUpsertInput) {
    throw new Error('greetingUpsertInput is a required property');
  }
};
