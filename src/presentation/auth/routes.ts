import { Request, Response, Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const dataSource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(dataSource);
    const controller = new AuthController(authRepository);

    router.post('/login', controller.loginUser);

    router.post('/register', (req: Request, res: Response) => {
      controller.registerUser(req, res);
    });

    return router;
  }
}
