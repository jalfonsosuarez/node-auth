import { Envs } from './config';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  new Server({
    port: Envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
