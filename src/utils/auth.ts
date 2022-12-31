import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

export default function createToken(): boolean {
  try {
    dotenv.config();
    const chaveAdmin = process.env.key_admin || 'testeteste';
    const chaveToken = process.env.key_token || 'testeteste';
    const token = sign({ key: chaveAdmin }, chaveToken, {
      expiresIn: 60 * 60 * 24 * 365 * 2,
    });
    console.log(token);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
