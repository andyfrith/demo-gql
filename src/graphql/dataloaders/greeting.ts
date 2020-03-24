import { Context, Greeting } from '../../service/types';
import { logger } from './../../logger';
import * as DataLoader from 'dataloader';
import Service from '../../service';

export function greetingDataLoader(ctx: Context) {
  return new DataLoader<string, Greeting>(
    async (ids: string[]): Promise<Greeting[]> => {
      const output = await Promise.all(ids.map((id) => Service.getGreeting(ctx, { id })));
      logger.debug({ output }, 'greetingDataLoader');
      return [output[0].greeting];
    },
    {
      maxBatchSize: 1000,
    }
  );
}
