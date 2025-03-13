import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDataBase {
  static async connect(options: Options) {
    const { dbName, mongoUrl } = options;
    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });
      console.log('Mongo connected!');
      return true;
    } catch (error) {
      console.log('Mongo conection error');
      throw error;
    }
  }
}
