import { Db } from 'mongodb';
import { Greeting } from '../service/types';
import { getDb } from './db';

export interface GreetingStore {
  getGreeting(id: string): Promise<Greeting>;
  upsertGreeting(id: string, message: string): Promise<any>;
}

const COLLECTION_NAME = 'greetings';

export class MongoGreetingStore implements GreetingStore {
  async getGreeting(id: string): Promise<Greeting> {
    const db: Db = await getDb();
    return await db.collection(COLLECTION_NAME).findOne({ id });
  }

  async upsertGreeting(id: string, message: string): Promise<any> {
    const db: Db = await getDb();
    return await db
      .collection(COLLECTION_NAME)
      .updateOne({ id }, { $set: { id, message } }, { upsert: true });
  }
}
