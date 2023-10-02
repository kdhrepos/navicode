import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import {
  CompanyRequestDto,
  RestaurantRequestDto,
  TicketValidationDto,
} from './ticket.dto';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get('validation')
  async ticketValidationCheck(
    @Body() ticketValidationDto: TicketValidationDto,
  ) {
    return await this.ticketService.validationCheck(ticketValidationDto);
  }

  @Get('restaurant')
  async getTicketsByRestaurant(
    @Query() restaurantRequestDto: RestaurantRequestDto,
  ) {
    return await this.ticketService.findAllSales(restaurantRequestDto);
  }
  @Get('company')
  async getTicketsByCompany(@Query() companyRequestDto: CompanyRequestDto) {
    return await this.ticketService.findAllExpenses(companyRequestDto);
  }
}
