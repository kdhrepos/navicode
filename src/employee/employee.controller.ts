import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeRegisterDto } from './dto/register.dto';
import { EmployeeSearchDto } from './dto/search.dto';
import { EmployeeStatusCheckDto } from './dto/check-status.dto';
import { EmployeeStatusSetDto } from './dto/set-status.dto';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post('register')
  async register(@Body() employeeRegisterDto: EmployeeRegisterDto) {
    return await this.employeeService.create(employeeRegisterDto);
  }

  @Get('search')
  async search(@Query() employeeSearchDto: EmployeeSearchDto) {
    return await this.employeeService.findAll(employeeSearchDto);
  }

  @Get('status')
  async checkStatus(@Body() employeeStatusCheckDto: EmployeeStatusCheckDto) {
    return await this.employeeService.checkStatus(employeeStatusCheckDto);
  }

  @Post('confirm')
  async setStatus(@Body() employeeStatusSetDto: EmployeeStatusSetDto) {
    return await this.employeeService.update(employeeStatusSetDto);
  }
}
