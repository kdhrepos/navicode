import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/model/employee.model';
import { EmployeeStatusCheckDto } from './dto/check-status.dto';
import { EmployeeRegisterDto } from './dto/register.dto';
import { Company } from 'src/model/company.model';
import { EmployeeSearchDto } from './dto/search.dto';
import { EmployeeStatusSetDto } from './dto/set-status.dto';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee)
    private employeeModel: typeof Employee,

    @InjectModel(Company)
    private companyModel: typeof Company,
  ) {}

  private readonly logger = new Logger('Employee Service');

  async create(response: Response, employeeRegisterDto: EmployeeRegisterDto) {
    const functionName = EmployeeService.prototype.create.name;
    try {
      const { companyUUID, employeePhoneNumber, employeeNumber, employeeName } =
        employeeRegisterDto;

      const company = await this.companyModel.findByPk(companyUUID);

      if (!company) {
        this.logger.error(`${functionName} : Company does not exist`);
        return response.status(400).json({
          status: 400,
          msg: "Error : Company doesn't exist",
        });
        // throw new HttpException(
        //   'Company does not exist',
        //   HttpStatus.BAD_REQUEST,
        // );
      }

      const employee = await this.employeeModel.findByPk(employeePhoneNumber);

      if (employee) {
        this.logger.error(`${functionName} : Duplicated Phone Number`);
        return response.status(400).json({
          status: 400,
          msg: 'Error : Duplicated Phone Number',
        });
        // throw new HttpException(
        //   'Duplicated Phone Number',
        //   HttpStatus.BAD_REQUEST,
        // );
      }

      await this.employeeModel.create({
        employeePhoneNumber: employeePhoneNumber,
        companyId: companyUUID,
        restaurantId: company.restaurantId,
        ticketCode: null,
        employeeNumber: employeeNumber,
        employeeName: employeeName,
        isAuthenticated: false,
      });

      this.logger.log(`${functionName} : Employee successfully registered`);

      return response.status(200).json({
        status: 200,
        msg: 'Employee information successfully saved',
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

  async checkStatus(
    response: Response,
    employeeStatusCheckDto: EmployeeStatusCheckDto,
  ) {
    const functionName = EmployeeService.prototype.checkStatus.name;
    try {
      const { employeePhoneNumber } = employeeStatusCheckDto;

      const employee = await this.employeeModel.findByPk(employeePhoneNumber);

      if (!employee) {
        this.logger.error(`${functionName} : Employee doesn't exist`);
        return response
          .status(500)
          .json({ status: 500, msg: "Error : Employee doesn't exists" });
        // throw new HttpException(
        //   'Wrong employee information',
        //   HttpStatus.BAD_REQUEST,
        // );
      }

      return response.status(200).json({
        status: '200',
        msg: 'Employee status successfully sended',
        data: {
          employee,
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

  async findAll(response: Response, employeeSearchDto: EmployeeSearchDto) {
    const functionName = EmployeeService.prototype.findAll.name;
    try {
      const { companyId } = employeeSearchDto;

      const company = await this.companyModel.findByPk(companyId);

      if (!company) {
        this.logger.error(`${functionName} : Company does not exist`);
        return response.status(400).json({
          status: 400,
          msg: 'Company does not exist',
        });
        // throw new HttpException('Wrong UUID', HttpStatus.BAD_REQUEST);
      }

      const employeeList = await this.employeeModel.findAll({
        where: {
          companyId: companyId,
        },
      });

      return response.status(200).json({
        status: 200,
        msg: 'Employee list successfully sended',
        data: {
          employeeList,
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

  async update(response: Response, employeeStatusSetDto: EmployeeStatusSetDto) {
    const functionName = EmployeeService.prototype.update.name;
    try {
      const { employeePhoneNumber, isAuthenticated } = employeeStatusSetDto;

      console.log(employeeStatusSetDto)
      const employee = await this.employeeModel.findByPk(employeePhoneNumber);

      if (!employee) {
        this.logger.error(`${functionName} : Employee does not exist`);
        return response.status(500).json({
          status: '500',
          msg: "Employee doesn't exist",
        });
        // throw new HttpException(
        //   'Wrong employee phone number',
        //   HttpStatus.BAD_REQUEST,
        // );
      }

      if (!isAuthenticated) {
        employee.ticketCode = null;
        employee.isAuthenticated = isAuthenticated;

        await employee.save();

        return response.status(200).json({
          status: '200',
          msg: 'Employee ticket denied',
        });
      } else {
        if (employee.ticketCode === null)
          employee.ticketCode = uuidv4().replace(/-/g, '');
        employee.isAuthenticated = isAuthenticated;

        await employee.save();

        return response.status(200).json({
          status: '200',
          msg: 'Employee ticket allowed',
        });
      }
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
