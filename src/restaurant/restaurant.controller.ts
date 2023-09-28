import { Controller, Post, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';
import { RestaurantInfoDto } from './info.dto';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get('info')
  async getInformation(@Query() restaurantInfoDto: RestaurantInfoDto) {}
}
