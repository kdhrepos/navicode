import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TicketMiddleWare implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body } = request;

    console.log(body.code);

    const code = body.code.split(' ');

    delete body['code'];

    body.uuid = code[0].replace(/-/g, '');
    body.ticketCode = code[1];
    body.employeePhoneNumber = code[2];
    body.timeStamp = new Date(code[3]);
    body.employeeCount = code[4];

    next();
  }
}
