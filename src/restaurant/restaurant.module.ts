import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from 'src/model/restaurant.model';

@Module({
  imports: [SequelizeModule.forFeature([Restaurant])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
