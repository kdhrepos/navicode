import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from 'src/model/company.model';
import { CompanySignUpDto } from './dto/sign-up.dto';
import { CompanyLoginDto } from './dto/login.dto';
import { CompanySearchDto } from './dto/search.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private companyModel: typeof Company,
  ) {}

  async create(registerDto: CompanySignUpDto) {
    await this.companyModel.create({
      companyId: registerDto.companyId,
      companyPassword: registerDto.companyPassword,
      companyName: registerDto.companyName,
      restaurantName: registerDto.restaurantName,
      restaurantCost: registerDto.restaurantCost,
    });
  }

  findOne(companyLoginDto: CompanyLoginDto) {}

  findAll(companySearchDto: CompanySearchDto) {}
}
