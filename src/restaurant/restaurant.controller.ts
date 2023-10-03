import { Controller, Post, Get, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';
import { RestaurantInfoDto } from './info.dto';
import { Response } from 'express';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get('info')
  async getInformation(
    @Res() response: Response,
    @Query() restaurantInfoDto: RestaurantInfoDto,
  ) {
    return await this.restaurantService.findOne(response, restaurantInfoDto);
  }
}
