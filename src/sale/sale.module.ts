import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { Sale } from 'src/model/sale.model';

@Module({
  imports: [SequelizeModule.forFeature([Sale])],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
