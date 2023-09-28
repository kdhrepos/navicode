import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyService } from './company.service';
import { Company } from 'src/model/company.model';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
