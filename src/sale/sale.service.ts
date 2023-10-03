import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Sale } from 'src/model/sale.model';
import { CompanyRequestDto, RestaurantRequestDto } from './sale.dto';
import { Restaurant } from 'src/model/restaurant.model';
import { Company } from 'src/model/company.model';
import { Op } from 'sequelize';
import { Response } from 'express';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale)
    private saleModel: typeof Sale,

    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant,

    @InjectModel(Company)
    private companyModel: typeof Company,
  ) {}
  private readonly logger = new Logger('Sale Service');

  async findAllSales(
    response: Response,
    restaurantRequestDto: RestaurantRequestDto,
  ) {
    const functionName = SaleService.prototype.findAllSales.name;
    try {
      const { restaurantName, from, to } = restaurantRequestDto;

      to.setDate(to.getDate()+1);

      const restaurant = await this.restaurantModel.findOne({
        where: {
          restaurantName: restaurantName,
        },
      });

      if (!restaurant) {
        this.logger.error(`${functionName} : Restaurant does not exist`);
        return response
          .status(500)
          .json({ status: 500, msg: "Error : Restaurant doesn't exist" });
        // throw new HttpException(
        //   'Wrong restaurant name',
        //   HttpStatus.BAD_REQUEST,
        // );
      }

      const sales = await this.saleModel.findAll({
        where: {
          restaurantId: restaurant.id,
          createdAt: {
            [Op.lt]: to,
            [Op.gte]: from,
          },
        },
        include: [
          {
            model: Company,
            attributes: ['companyName'],
          },
        ],
      });

      return response.status(200).json({
        status: 200,
        msg: 'Sales record successfully sended',
        data: { sales, cost: restaurant.cost },
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

  async findAllExpenses(
    response: Response,
    companyRequestDto: CompanyRequestDto,
  ) {
    const functionName = SaleService.prototype.findAllExpenses.name;
    try {
      const { companyUUID, from, to } = companyRequestDto;
      
      console.log(companyRequestDto);

      to.setDate(to.getDate()+1);

      const company = await this.companyModel.findByPk(companyUUID);

      if (!company) {
        this.logger.error(`${functionName} : Company does not exist`);

        return response
          .status(500)
          .json({ status: 500, msg: 'Error : Company does not exist' });
        // throw new HttpException('Wrong company id', HttpStatus.BAD_REQUEST);
      }

      const sales = await this.saleModel.findAll({
        where: {
          companyId: company.id,
          createdAt: {
            [Op.lt]: to,
            [Op.gte]: from,
          },
        },
        include: [
          {
            model: Restaurant,
            attributes: ['restaurantName', 'cost'],
          },
        ],
      });

      return response.status(200).json({
        status: 200,
        msg: 'Expenses record successfully sended',
        salesData: { sales },
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
