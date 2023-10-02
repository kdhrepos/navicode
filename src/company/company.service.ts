import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from 'src/model/company.model';
import { CompanySignUpDto } from './dto/sign-up.dto';
import { CompanyLoginDto } from './dto/login.dto';
import { CompanySearchDto } from './dto/search.dto';
import { Sequelize, where } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { Restaurant } from 'src/model/restaurant.model';
import { register } from 'module';
import { v4 as uuidv4 } from 'uuid';
import { Contraction } from 'src/model/contraction.model';
import { UUID } from 'crypto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private companyModel: typeof Company,

    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant,

    @InjectModel(Contraction)
    private contractionModel: typeof Contraction,
  ) {}

  private readonly logger = new Logger('Company Service');

  async create(registerDto: CompanySignUpDto) {
    const functionName = CompanyService.prototype.create.name;
    try {
      const {
        companyId,
        companyPassword,
        companyName,
        restaurantName,
        restaurantCost,
      } = registerDto;

      console.log(registerDto);

      const company = await this.companyModel.findOne({
        where: {
          company_id: companyId,
        },
      });

      if (company) {
        this.logger.error(`${functionName} : Duplicated company id`);
        throw new HttpException('Duplicated ID', HttpStatus.BAD_REQUEST);
      }

      const restaurant = await this.restaurantModel.findOne({
        where: { restaurant_name: restaurantName },
      });

      const hashedPassword = await bcrypt.hash(companyPassword, 10);

      let restaurantId;
      const companyUuid = uuidv4().replace(/-/g, '');

      if (restaurant) restaurantId = restaurant.id;
      else {
        restaurantId = uuidv4().replace(/-/g, '');
        await this.restaurantModel.create({
          id: restaurantId,
          cost: restaurantCost,
          restaurant_name: restaurantName,
        });
      }

      await this.companyModel.create({
        id: companyUuid,
        restaurant_id: restaurantId,
        company_id: companyId,
        company_password: hashedPassword,
        company_name: companyName,
        restaurant_name: restaurantName,
        restaurant_cost: restaurantCost,
      });

      await this.contractionModel.create({
        restaurant_id: restaurantId,
        company_id: companyUuid,
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
      const company = await this.companyModel.findOne({
        where: {
          company_id: companyLoginDto.companyId,
        },
      });

      if (!company) {
        this.logger.error(`${functionName} : Company does not exists`);
        throw new HttpException('Wrong ID', HttpStatus.BAD_REQUEST);
      }

      const isPasswordCorrect = await bcrypt.compare(
        companyLoginDto.companyPassword,
        company.company_password,
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

      const companies = await this.companyModel.findAll({
        where: {
          company_name: companyName,
        },
        attributes: ['id', 'company_name'],
      });

      this.logger.log(`${functionName} : Search company successfully done`);

      return companies;
    } catch (error) {
      throw new HttpException(
        `${functionName} ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
