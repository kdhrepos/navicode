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
import { CompanyInfoDto } from './dto/info.dto';

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
          companyId: companyId,
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
        where: { restaurantName: restaurantName },
      });

      const hashedPassword = await bcrypt.hash(companyPassword, 10);

      let restaurantId;
      const companyUUID = uuidv4().replace(/-/g, '');

      if (restaurant) restaurantId = restaurant.id;
      else {
        restaurantId = uuidv4().replace(/-/g, '');
        restaurant = await this.restaurantModel.create({
          id: restaurantId,
          cost: restaurantCost,
          restaurantName: restaurantName,
        });
      }

      company = await this.companyModel.create({
        id: companyUUID,
        restaurantId: restaurantId,
        companyId: companyId,
        companyPassword: hashedPassword,
        companyName: companyName,
        restaurantName: restaurantName,
        restaurantCost: restaurantCost,
      });

      await this.contractionModel.create({
        restaurantId: restaurantId,
        companyId: companyUUID,
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

  async login(response: Response, companyLoginDto: CompanyLoginDto) {
    const functionName = CompanyService.prototype.login.name;
    try {
      const company = await this.companyModel.findOne({
        where: {
          companyId: companyLoginDto.companyId,
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
        company.companyPassword,
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
        contractionInfo.restaurantId,
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

  async findOne (response: Response, companyInfoDto : CompanyInfoDto){
    const functionName = CompanyService.prototype.findOne.name;
  try {
    const {companyUUID}= companyInfoDto;

    const company = await this.companyModel.findByPk(companyUUID);

    if (!company) {
      this.logger.error(`${functionName} : Company does not exists`);
      return response
        .status(500)
        .json({ status: '500', msg: 'Error : Company does not exists UUID' });
      // throw new HttpException('Wrong ID', HttpStatus.BAD_REQUEST);
    }

    return response.json({
      data:company,
    })
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

      const companyNameList = await this.companyModel.findAll({
        where: {
          companyName: companyName,
        },
        attributes: ['id' as 'companyId', 'companyName'],
      });

      this.logger.log(`${functionName} : Company list successfully sended`);

      return response.status(200).json({
        status: '200',
        msg: 'Company list successfully sended',
        data: {
          companyNameList,
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
