import { Request, response, Response } from 'express';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { CustomError } from '../../domain';
import { UserModel } from '../../data/mongodb';
import { JwtAdapter } from '../../config';

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // todo: usar Winston
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error.' });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.authRepository
      .register(registerUserDto!)
      .then((user) =>
        res.json({
          user,
          token: JwtAdapter.generateToken({ id: user.id }),
        }),
      )
      .catch((error) => this.handleError(error, response));
  };

  loginUser = (req: Request, res: Response) => {
    res.json('Login User Controller');
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) =>
        res.send({
          users,
          user: req.body.user,
        }),
      )
      .catch(() => res.status(500).json({ error: 'Internal Server Error' }));
  };
}
