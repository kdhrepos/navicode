import { Controller, Post, Get, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SaleService } from './sale.service';
import { CompanyRequestDto, RestaurantRequestDto } from './sale.dto';
import { Response } from 'express';

@ApiTags('Sale')
@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Get('restaurant')
  async getRestaurantSales(
    @Res() response: Response,
    @Query() restaurantRequestDto: RestaurantRequestDto,
  ) {
    return await this.saleService.findAllSales(response, restaurantRequestDto);
  }

  @Get('company')
  async getCompanyExpense(
    @Res() response: Response,
    @Query() companyRequestDto: CompanyRequestDto,
  ) {
    return await this.saleService.findAllExpenses(response, companyRequestDto);
  }
}
