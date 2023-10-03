import { Controller, Post, Get, Body, Query, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeRegisterDto } from './dto/register.dto';
import { EmployeeSearchDto } from './dto/search.dto';
import { EmployeeStatusCheckDto } from './dto/check-status.dto';
import { EmployeeStatusSetDto } from './dto/set-status.dto';
import { Response } from 'express';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post('register')
  async register(
    @Res() response: Response,
    @Body() employeeRegisterDto: EmployeeRegisterDto,
  ) {
    return await this.employeeService.create(response, employeeRegisterDto);
  }

  @Get('search')
  async search(
    @Res() response: Response,
    @Query() employeeSearchDto: EmployeeSearchDto,
  ) {
    return await this.employeeService.findAll(response, employeeSearchDto);
  }

  @Get('status')
  async checkStatus(
    @Res() response: Response,
    @Body() employeeStatusCheckDto: EmployeeStatusCheckDto,
  ) {
    return await this.employeeService.checkStatus(
      response,
      employeeStatusCheckDto,
    );
  }

  @Post('confirm')
  async setStatus(
    @Res() response: Response,
    @Body() employeeStatusSetDto: EmployeeStatusSetDto,
  ) {
    return await this.employeeService.update(response, employeeStatusSetDto);
  }
}
