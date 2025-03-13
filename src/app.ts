import { Envs } from './config';
import { MongoDataBase } from './data/mongodb';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  MongoDataBase.connect({
    dbName: Envs.MONGO_DB_NAME,
    mongoUrl: Envs.MONGO_URL,
  });

  new Server({
    port: Envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
