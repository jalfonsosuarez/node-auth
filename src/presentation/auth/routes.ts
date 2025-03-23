import { NextFunction, Request, Response, Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import { AuthMiddelware } from './middelwares/auth.middelware';

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

    router.get(
      '/',
      (req: Request, res: Response, next: NextFunction) => {
        AuthMiddelware.validateJWT(req, res, next);
      },
      controller.getUsers,
    );

    return router;
  }
}
