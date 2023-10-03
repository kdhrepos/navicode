import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Ticket } from 'src/model/ticket.model';
import {
  CompanyRequestDto,
  RestaurantRequestDto,
  TicketValidationDto,
} from './ticket.dto';
import { Restaurant } from 'src/model/restaurant.model';
import { Company } from 'src/model/company.model';
import { Employee } from 'src/model/employee.model';
import { Sale } from 'src/model/sale.model';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket)
    private ticketModel: typeof Ticket,

    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant,

    @InjectModel(Company)
    private companyModel: typeof Company,

    @InjectModel(Employee)
    private employeeModel: typeof Employee,

    @InjectModel(Sale)
    private saleModel: typeof Sale,
  ) {}

  private readonly logger = new Logger('Ticket Service');

  checkTimeout = (time: any) => {
    const presentTime = new Date();
    const recordedTime = new Date(time);
    const timeDiff = Math.floor(
      (presentTime.getTime() - recordedTime.getTime()) / (1000 * 60),
    );

    this.logger.log(
      `checkTimeout : ${presentTime} - ${recordedTime} = ${timeDiff}`,
    );

    if (timeDiff > 10) return false;
    return true;
  };

  async validationCheck(
    response: Response,
    ticketValidationDto: TicketValidationDto,
  ) {
    const functionName = TicketService.prototype.validationCheck.name;
    try {
      const {
        uuid,
        ticketCode,
        employeePhoneNumber,
        timeStamp,
        employeeCount,
      } = ticketValidationDto;

      const checkUsedTicket = await this.ticketModel.findByPk(uuid);

      if (checkUsedTicket) {
        this.logger.error(`${functionName} : Ticket already used`);
        return response
          .status(200)
          .json({ status: 600, msg: 'Error : This Ticket is already used' });
        // throw new HttpException('Ticket already used', HttpStatus.BAD_REQUEST);
      }

      const employee = await this.employeeModel.findByPk(employeePhoneNumber);

      if (!employee) {
        this.logger.error(`${functionName} : Employee doesn't exist`);
        return response
          .status(200)
          .json({ status: 400, msg: "Error : Employee doesn't exist" });
        // throw new HttpException(
          // 'Wrong employee phone number',
          // HttpStatus.BAD_REQUEST,
        // );
      }

      if (employee.ticketCode !== ticketCode) {
        this.logger.error(`${functionName} : Wrong ticket code`);
        return response
        .status(200)
        .json({ status: 400, msg: 'Error : Incorrect ticket code' });
        // throw new HttpException('Wrong ticket code', HttpStatus.BAD_REQUEST);
      }

      if (!this.checkTimeout(timeStamp)) {
        this.logger.error(`${functionName} : Time out ticket`);
        return response
        .status(200)
        .json({ status: 500, msg: 'Error : Time over' });
        // throw new HttpException('Time out ticket', HttpStatus.BAD_REQUEST);
      }

      // Ticket Save
      await this.ticketModel.create({
        id: uuid,
        employeeCount: employeeCount,
        companyId: employee.companyId,
        restaurantId: employee.restaurantId,
        timeStamp: timeStamp,
        employeePhoneNumber: employeePhoneNumber,
      });
      // Ticket Save

      // Sales Integrated, Save
      const time = new Date(timeStamp);

      let today = new Date(
        Date.UTC(time.getFullYear(), time.getMonth(), time.getDate()),
      );

      let tomorrow = new Date(
        Date.UTC(time.getFullYear(), time.getMonth(), time.getDate() + 1),
      );

      let todayISOString = today.toISOString();
      let tomorrowISOString = tomorrow.toISOString();

      const restaurant = await Restaurant.findByPk(employee.restaurantId);
      const cost = restaurant.cost;

      const formerSale = await this.saleModel.findAll({
        where: {
          companyId: employee.companyId,
          createdAt: {
            [Op.lt]: tomorrowISOString,
            [Op.gte]: todayISOString,
          },
        },
      });

      if (formerSale.length === 0) {
        await this.saleModel.create({
          id: uuidv4().replace(/-/g, ''),
          amount: cost * employeeCount,
          companyId: employee.companyId,
          restaurantId: restaurant.id,
        });
        return;
      }

      formerSale[0].amount = formerSale[0].amount + cost * employeeCount;
      await formerSale[0].save();
      
      return response.status(200).json({
        status: 200,
        msg: "Authentificated",
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

  async findAllSales(
    response: Response,
    restaurantRequestDto: RestaurantRequestDto,
  ) {
    const functionName = TicketService.prototype.findAllSales.name;
    try {
      const { restaurantName } = restaurantRequestDto;

      const restaurant = await this.restaurantModel.findOne({
        where: {
          restaurantName: restaurantName,
        },
      });

      if (!restaurant) {
        this.logger.error(`${functionName} : Restaurant does not exist`);
        return response
          .status(500)
          .json({ status: '500', msg: 'Error : Restaurant does not exist' });
        // throw new HttpException(
        //   'Wrong restaurant name',
        //   HttpStatus.BAD_REQUEST,
        // );
      }

      const tickets = await this.ticketModel.findAll({
        where: {
          restaurantId: restaurant.id,
        },include:[
          {
            model:Company,
            attributes:['companyName'],
          }
        ]
      });

      return response.status(200).json({
        status: '200',
        msg: 'Ticket successfully found',
        data: {
          tickets,
        },
      });
    } catch (error) {
      throw new HttpException(
        `${functionName} ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllExpenses(
    response: Response,
    companyRequestDto: CompanyRequestDto,
  ) {
    const functionName = TicketService.prototype.findAllExpenses.name;
    try {
      const { companyUUID } = companyRequestDto;

      const company = await this.companyModel.findByPk(companyUUID);

      if (!company) {
        this.logger.error(`${functionName} : Company does not exist`);
        return response
          .status(500)
          .json({ status: '500', msg: 'Error : Company does not exist' });
        // throw new HttpException('Wrong company uuid', HttpStatus.BAD_REQUEST);
      }

      const tickets = await this.ticketModel.findAll({
        where: {
          companyId: company.id,
        },
        include:[
          {
            model:Employee,
            attributes : ["employeeNumber","employeeName"],
          }
        ]
      });

      const restaurant = await this.restaurantModel.findByPk(
        tickets[0].restaurantId,
      );
      return response.status(200).json({
        status: '200',
        msg: 'Ticket successfully found',
        data: {
          tickets,
          restaurantName: restaurant.restaurantName,
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
