import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/model/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
