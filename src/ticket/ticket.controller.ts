import { Controller, Post, Get, Query, Body, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import {
  CompanyRequestDto,
  RestaurantRequestDto,
  TicketValidationDto,
} from './ticket.dto';
import { Response } from 'express';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get('validation')
  async ticketValidationCheck(
    @Res() response: Response,
    @Body() ticketValidationDto: TicketValidationDto,
  ) {
    return await this.ticketService.validationCheck(
      response,
      ticketValidationDto,
    );
  }

  @Get('restaurant')
  async getTicketsByRestaurant(
    @Res() response: Response,
    @Query() restaurantRequestDto: RestaurantRequestDto,
  ) {
    return await this.ticketService.findAllSales(
      response,
      restaurantRequestDto,
    );
  }
  @Get('company')
  async getTicketsByCompany(
    @Res() response: Response,
    @Query() companyRequestDto: CompanyRequestDto,
  ) {
    return await this.ticketService.findAllExpenses(
      response,
      companyRequestDto,
    );
  }
}
