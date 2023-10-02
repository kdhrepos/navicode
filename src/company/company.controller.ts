import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Req,
  Request,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanySignUpDto } from './dto/sign-up.dto';
import { CompanyLoginDto } from './dto/login.dto';
import { CompanySearchDto } from './dto/search.dto';
import { CompanyInfoDto } from './dto/info.dto';
import { Response } from 'express';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @ApiOperation({ description: 'Sign up for company' })
  @Post('sign-up')
  async signUp(@Query() companyRegisterDto: CompanySignUpDto) {
    return await this.companyService.create(companyRegisterDto);
  }

  @Post('login')
  async login(@Query() companyLoginDto: CompanyLoginDto) {
    return await this.companyService.findOne(companyLoginDto);
  }

  @Get('search')
  async searchCompanies(@Body() companySearchDto: CompanySearchDto) {
    return await this.companyService.findAll(companySearchDto);
  }

  @Get('info')
  async getInformation(@Query() companyInfoDto: CompanyInfoDto) {
    // return await this.companyService.findOne(response, companyInfoDto);
  }
}
