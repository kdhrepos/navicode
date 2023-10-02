import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/model/employee.model';
import { CompanyModule } from 'src/company/company.module';
import { Company } from 'src/model/company.model';

@Module({
  imports: [SequelizeModule.forFeature([Employee, Company])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
