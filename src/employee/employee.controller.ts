import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeRegisterDto } from './dto/register.dto';
import { EmployeeSearchDto } from './dto/search.dto';
import { EmployeeStatusCheckDto } from './dto/status-check.dto';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post('register')
  async register(@Body() employeeRegisterDto: EmployeeRegisterDto) {}

  @Get('status')
  async checkStatus(@Query() employeeSearchDto: EmployeeSearchDto) {}

  @Get('search')
  async searchEmployees(
    @Body() employeeStatusCheckDto: EmployeeStatusCheckDto,
  ) {}
}
