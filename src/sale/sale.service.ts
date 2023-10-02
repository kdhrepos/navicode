import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Sale } from 'src/model/sale.model';
import { CompanyRequestDto, RestaurantRequestDto } from './sale.dto';
import { Restaurant } from 'src/model/restaurant.model';
import { Company } from 'src/model/company.model';
import { Op } from 'sequelize';

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

  async findAllSales(restaurantRequestDto: RestaurantRequestDto) {
    const functionName = SaleService.prototype.findAllSales.name;
    try {
      const { restaurantName, fromDate, toDate } = restaurantRequestDto;

      const restaurant = await this.restaurantModel.findOne({
        where: {
          restaurant_name: restaurantName,
        },
      });

      if (!restaurant) {
        this.logger.error(`${functionName} : Restaurant does not exist`);
        throw new HttpException(
          'Wrong restaurant name',
          HttpStatus.BAD_REQUEST,
        );
      }

      const sales = await this.saleModel.findAll({
        where: {
          restaurant_id: restaurant.id,
          createdAt: {
            [Op.lt]: toDate,
            [Op.gte]: fromDate,
          },
        },
        include: [
          {
            model: Company,
            attributes: ['company_name'],
          },
        ],
      });

      return sales;
    } catch (error) {
      throw new HttpException(
        `${functionName} ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllExpenses(companyRequestDto: CompanyRequestDto) {
    const functionName = SaleService.prototype.findAllExpenses.name;
    try {
      const { companyId, fromDate, toDate } = companyRequestDto;

      const company = await this.companyModel.findByPk(companyId);

      if (!company) {
        this.logger.error(`${functionName} : Company does not exist`);
        throw new HttpException('Wrong company id', HttpStatus.BAD_REQUEST);
      }

      const expenses = await this.saleModel.findAll({
        where: {
          company_id: company.id,
          createdAt: {
            [Op.lt]: toDate,
            [Op.gte]: fromDate,
          },
        },
        include: [
          {
            model: Restaurant,
            attributes: ['restaurant_name', 'cost'],
          },
        ],
      });

      return expenses;
    } catch (error) {
      throw new HttpException(
        `${functionName} ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create() {}
}
