import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class MdwareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('midware');
    const MOCK_API_KEY: string = '51asd6as6dnh125ntz9t38nzv8v389';
    //tipically e.g: checking req headers,  check webhook signature, keys etc
    const { authorization } = req.headers;
    if (!authorization)
      throw new HttpException('Not authorized.', HttpStatus.FORBIDDEN);
    if (authorization == MOCK_API_KEY) {
      next();
    } else {
      throw new HttpException('Invalid API Key.', HttpStatus.FORBIDDEN);
    }
  }
}
