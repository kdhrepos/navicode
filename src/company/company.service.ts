import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from 'src/model/company.model';
import { CompanySignUpDto } from './dto/sign-up.dto';
import { CompanyLoginDto } from './dto/login.dto';
import { CompanySearchDto } from './dto/search.dto';
import * as bcrypt from 'bcrypt';
import { Restaurant } from 'src/model/restaurant.model';
import { v4 as uuidv4 } from 'uuid';
import { Contraction } from 'src/model/contraction.model';
import { Response } from 'express';

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

  async create(response: Response, registerDto: CompanySignUpDto) {
    const functionName = CompanyService.prototype.create.name;
    try {
      const {
        companyId,
        companyPassword,
        companyName,
        restaurantName,
        restaurantCost,
      } = registerDto;

      let company = await this.companyModel.findOne({
        where: {
          company_id: companyId,
        },
      });

      if (company) {
        this.logger.error(`${functionName} : Duplicated company id`);
        return response.status(400).json({
          status: '400',
          msg: 'Duplicated company id',
        });
        // throw new HttpException('Duplicated ID', HttpStatus.BAD_REQUEST);
      }

      let restaurant = await this.restaurantModel.findOne({
        where: { restaurant_name: restaurantName },
      });

      const hashedPassword = await bcrypt.hash(companyPassword, 10);

      let restaurantId;
      const companyUuid = uuidv4().replace(/-/g, '');

      if (restaurant) restaurantId = restaurant.id;
      else {
        restaurantId = uuidv4().replace(/-/g, '');
        restaurant = await this.restaurantModel.create({
          id: restaurantId,
          cost: restaurantCost,
          restaurant_name: restaurantName,
        });
      }

      company = await this.companyModel.create({
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

      return response.status(200).json({
        status: '200',
        msg: 'Company successfully registered',
        data: {
          restaurant,
          company,
        },
      });
    } catch (error) {
      // this.logger.error(`${error}`);
      // throw new HttpException(
      //   `${functionName} ${error}`,
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
      this.logger.error(`${functionName} : ${error}`);
      return response.status(500).json({
        status: '500',
        msg: `${error}`,
      });
    }
  }

  async findOne(response: Response, companyLoginDto: CompanyLoginDto) {
    const functionName = CompanyService.prototype.findOne.name;
    try {
      const company = await this.companyModel.findOne({
        where: {
          company_id: companyLoginDto.companyId,
        },
      });

      if (!company) {
        this.logger.error(`${functionName} : Company does not exists`);
        return response
          .status(400)
          .json({ status: '400', msg: 'Error : Wrong id' });
        // throw new HttpException('Wrong ID', HttpStatus.BAD_REQUEST);
      }

      const isPasswordCorrect = await bcrypt.compare(
        companyLoginDto.companyPassword,
        company.company_password,
      );

      if (!isPasswordCorrect) {
        this.logger.error(`${functionName} : Wrong password`);
        return response
          .status(400)
          .json({ status: '400', msg: 'Error : Wrong password' });
        // throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
      }

      const contractionInfo = await this.contractionModel.findByPk(company.id);

      const restaurant = await this.restaurantModel.findByPk(
        contractionInfo.restaurant_id,
      );

      this.logger.log(`${functionName} : Company successfully logined`);

      return response.status(200).json({
        status: '200',
        msg: 'Login successed',
        data: { company, restaurant },
      });
    } catch (error) {
      // throw new HttpException(
      //   `${functionName} ${error}`,
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
      this.logger.error(`${functionName} : ${error}`);
      return response.status(500).json({
        status: '500',
        msg: `${error}`,
      });
    }
  }

  async findAll(response: Response, companySearchDto: CompanySearchDto) {
    const functionName = CompanyService.prototype.findAll.name;
    try {
      const companyName = companySearchDto.companyName;

      const companies = await this.companyModel.findAll({
        where: {
          company_name: companyName,
        },
        attributes: ['id', 'company_name'],
      });

      this.logger.log(`${functionName} : Company list successfully sended`);

      return response.status(200).json({
        status: '200',
        msg: 'Company list successfully sended',
        data: {
          companies,
        },
      });
    } catch (error) {
      // throw new HttpException(
      //   `${functionName} ${error}`,
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
      this.logger.error(`${functionName} : ${error}`);
      return response.status(500).json({
        status: '500',
        msg: `${error}`,
      });
    }
  }
}
