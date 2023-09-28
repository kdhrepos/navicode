import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Restaurant } from 'src/model/restaurant.model';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant,
  ) {}

  findOne() {}
}
