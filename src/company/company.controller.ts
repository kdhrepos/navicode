import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Req,
  Request,
  HttpStatus,
  HttpCode,
  Res,
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
  async signUp(
    @Res() response: Response,
    @Body() companyRegisterDto: CompanySignUpDto,
  ) {
    return await this.companyService.create(response, companyRegisterDto);
  }

  @Post('login')
  async login(
    @Res() response: Response,
    @Body() companyLoginDto: CompanyLoginDto,
  ) {
    return await this.companyService.login(response, companyLoginDto);
  }

  @Get('search')
  async searchCompanies(
    @Res() response: Response,
    @Body() companySearchDto: CompanySearchDto,
  ) {
    return await this.companyService.findAll(response, companySearchDto);
  }

  @Get('info')
  async getInformation(
    @Res() response: Response,
    @Query() companyInfoDto: CompanyInfoDto) {
    return await this.companyService.findOne(response, companyInfoDto);
  }
}
