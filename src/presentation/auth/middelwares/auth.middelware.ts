import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../config';
import { UserModel } from '../../../data/mongodb';

export class AuthMiddelware {
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json('No token provider.');
    if (!authorization.startsWith('Bearer ')) return res.status(401).json('Bearer token is not valid.');

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);

      if (!payload) return res.status(401).json('Token is not valid.');

      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(401).json({ error: 'Token is not valid.' });

      req.body.user = user;

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  };
}
