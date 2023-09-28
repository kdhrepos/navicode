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

  create(companyRegister: CompanySignUpDto) {}

  findOne(companyLogin: CompanyLoginDto) {}

  findAll(companySearch: CompanySearchDto) {}
}
