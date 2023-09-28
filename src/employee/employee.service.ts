import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/model/employee.model';
import { EmployeeStatusCheckDto } from './dto/status-check.dto';
import { EmployeeRegisterDto } from './dto/register.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee)
    private employeeModel: typeof Employee,
  ) {}

  create(employeeRegister: EmployeeRegisterDto) {}

  statusCheck(employeeStatusCheck: EmployeeStatusCheckDto) {}

  findAll() {}
}
