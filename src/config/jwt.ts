import jwt, { Secret } from 'jsonwebtoken';
import { Envs } from './envs';

const JWT_SEED: Secret = Envs.JWT_SEED as Secret;

export class JwtAdapter {
  static generateToken(payload: Object, duration: number = 60 * 60 * 2): string {
    const token: string = jwt.sign(payload, JWT_SEED, { expiresIn: duration });
    return token;
  }

  static async validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
