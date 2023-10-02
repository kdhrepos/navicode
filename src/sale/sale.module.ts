import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { Sale } from 'src/model/sale.model';
import { Restaurant } from 'src/model/restaurant.model';
import { Company } from 'src/model/company.model';

@Module({
  imports: [SequelizeModule.forFeature([Sale, Restaurant, Company])],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
