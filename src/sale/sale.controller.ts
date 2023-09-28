import { Controller, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SaleService } from './sale.service';

@ApiTags('Sale')
@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Get('restaurant')
  async getRestaurantSales() {}

  @Get('company')
  async getCompanyExpense() {}
}
