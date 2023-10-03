import { Get, Injectable, Logger, Query, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { Restaurant } from 'src/model/restaurant.model';
import { RestaurantInfoDto } from './info.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant,
  ) {}

  private readonly logger = new Logger('Restaurant Service');

  async findOne(response: Response, restaurantInfoDto: RestaurantInfoDto) {
    const functionName = RestaurantService.prototype.findOne.name;
    try {
    } catch (error) {
      // throw new HttpException(
      //   `${functionName} ${error}`,
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
      this.logger.error(`${functionName} : ${error}`);
      return response.status(500).json({
        status: '500',
        msg: `${error}`,
      });
    }
  }
}
