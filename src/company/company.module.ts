import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyService } from './company.service';
import { Company } from 'src/model/company.model';
import { Restaurant } from 'src/model/restaurant.model';
import { Contraction } from 'src/model/contraction.model';

@Module({
  imports: [SequelizeModule.forFeature([Company, Restaurant, Contraction])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
