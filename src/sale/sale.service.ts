import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Sale } from 'src/model/sale.model';
import { CompanyRequestDto, RestaurantRequestDto } from './sale.dto';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale)
    private saleModel: typeof Sale,
  ) {}

  findAll(request: RestaurantRequestDto | CompanyRequestDto) {}
}
