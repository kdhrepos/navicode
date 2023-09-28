import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Ticket } from 'src/model/ticket.model';
import {
  CompanyRequestDto,
  RestaurantRequestDto,
  TicketValidationDto,
} from './ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket)
    private ticketModel: typeof Ticket,
  ) {}

  validationCheck(ticket: TicketValidationDto) {}

  findAll(params: CompanyRequestDto | RestaurantRequestDto) {}
}
