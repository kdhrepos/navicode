import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from 'src/model/company.model';
import { CompanySignUpDto } from './dto/sign-up.dto';
import { CompanyLoginDto } from './dto/login.dto';
import { CompanySearchDto } from './dto/search.dto';
import { Sequelize, where } from 'sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private companyModel: typeof Company,
  ) {}

  private readonly logger = new Logger('CompanyService');

  async create(registerDto: CompanySignUpDto) {
    const functionName = CompanyService.prototype.create.name;
    try {
      const companyExists = await this.companyModel.findOne({
        where: {
          company_id: registerDto.companyId,
        },
      });

      if (companyExists) {
        this.logger.error(`${functionName} : Duplicated company id`);
        throw new HttpException('Duplicated ID', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(registerDto.companyPassword, 10);

      await this.companyModel.create({
        id: Sequelize.literal('REPLACE(UUID(), "-", "")'),
        restaurant_id: Sequelize.literal('REPLACE(UUID(), "-", "")'),
        company_id: registerDto.companyId,
        company_password: hashedPassword,
        company_name: registerDto.companyName,
        restaurant_name: registerDto.restaurantName,
        restaurant_cost: registerDto.restaurantCost,
      });
    } catch (error) {
      this.logger.error(`${error}`);
      throw new HttpException(
        `${functionName} ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(companyLoginDto: CompanyLoginDto) {
    const functionName = CompanyService.prototype.findOne.name;
    try {
      const companyExists = await this.companyModel.findOne({
        where: {
          company_id: companyLoginDto.companyId,
        },
      });

      if (!companyExists) {
        this.logger.error(`${functionName} : Company does not exists`);
        throw new HttpException('Wrong ID', HttpStatus.BAD_REQUEST);
      }

      const isPasswordCorrect = await bcrypt.compare(
        companyLoginDto.companyPassword,
        companyExists.company_password,
      );

      if (!isPasswordCorrect) {
        this.logger.error(`${functionName} : Company does not exists`);
        throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
      }

      this.logger.log(`${functionName} : User successfully logined`);
      return true;
    } catch (error) {
      throw new HttpException(
        `${functionName} ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(companySearchDto: CompanySearchDto): Promise<Company[]> {
    const functionName = CompanyService.prototype.findAll.name;
    try {
      const companyName = companySearchDto.companyName;

      const searchedCompanies = await this.companyModel.findAll({
        where: {
          company_name: companyName,
        },
        attributes: ['id', 'company_name'],
      });

      this.logger.log(`${functionName} : Search company successfully done`);

      return searchedCompanies;
    } catch (error) {
      throw new HttpException(
        `${functionName} ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
