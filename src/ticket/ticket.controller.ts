import { Controller, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketService } from './ticket.service';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get('validation')
  async ticketValidationCheck() {}

  @Get('restaurant')
  async getTicketByRestaurant() {}

  @Get('company')
  async getTicketByCompany() {}
}
