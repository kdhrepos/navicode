import { Controller, Post, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SaleService } from './sale.service';
import { CompanyRequestDto, RestaurantRequestDto } from './sale.dto';

@ApiTags('Sale')
@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Get('restaurant')
  async getRestaurantSales(
    @Query() restaurantRequestDto: RestaurantRequestDto,
  ) {
    return await this.saleService.findAllSales(restaurantRequestDto);
  }

  @Get('company')
  async getCompanyExpense(@Query() companyRequestDto: CompanyRequestDto) {
    return await this.saleService.findAllExpenses(companyRequestDto);
  }
}
