import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/model/employee.model';
import { EmployeeStatusCheckDto } from './dto/check-status.dto';
import { EmployeeRegisterDto } from './dto/register.dto';
import { Company } from 'src/model/company.model';
import { EmployeeSearchDto } from './dto/search.dto';
import { EmployeeStatusSetDto } from './dto/set-status.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee)
    private employeeModel: typeof Employee,

    @InjectModel(Company)
    private companyModel: typeof Company,
  ) {}

  private readonly logger = new Logger('Employee Service');

  async create(employeeRegisterDto: EmployeeRegisterDto) {
    const functionName = EmployeeService.prototype.create.name;
    try {
      const { companyUuid, employeePhoneNumber, employeeNumber, employeeName } =
        employeeRegisterDto;

      const company = await this.companyModel.findByPk(companyUuid);

      if (!company) {
        this.logger.error(`${functionName} : Company does not exist`);
        throw new HttpException(
          'Company does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const employee = await this.employeeModel.findByPk(employeePhoneNumber);

      if (employee) {
        this.logger.error(`${functionName} : Duplicated Phone Number`);
        throw new HttpException(
          'Duplicated Phone Number',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.employeeModel.create({
        employee_phone_number: employeePhoneNumber,
        company_id: companyUuid,
        restaurant_id: company.restaurant_id,
        ticket_code: null,
        employee_number: employeeNumber,
        employee_name: employeeName,
        is_authenticated: false,
      });

      this.logger.log(`${functionName} : Employee successfully registered`);
      return true;
    } catch (error) {
      throw new HttpException(
        `${functionName} ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkStatus(employeeStatusCheckDto: EmployeeStatusCheckDto) {
    const functionName = EmployeeService.prototype.checkStatus.name;
    try {
      const { employeePhoneNumber } = employeeStatusCheckDto;

      const employee = await this.employeeModel.findByPk(employeePhoneNumber);

      if (!employee) {
        this.logger.error(`${functionName} : Employee doesn't exist`);
        throw new HttpException(
          'Wrong employee information',
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        status: employee.is_authenticated,
        ticketCode: employee.ticket_code,
      };
    } catch (error) {
      throw new HttpException(
        `${functionName} ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(employeeSearchDto: EmployeeSearchDto): Promise<Employee[]> {
    const functionName = EmployeeService.prototype.findAll.name;
    try {
      const { companyId } = employeeSearchDto;

      const company = await this.companyModel.findByPk(companyId);

      if (!company) {
        this.logger.error(`${functionName} : Company does not exists`);
        throw new HttpException('Wrong UUID', HttpStatus.BAD_REQUEST);
      }

      const employeeList = await this.employeeModel.findAll({
        where: {
          company_id: companyId,
        },
      });

      return employeeList;
    } catch (error) {
      throw new HttpException(
        `${functionName} ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(employeeStatusSetDto: EmployeeStatusSetDto) {
    const functionName = EmployeeService.prototype.update.name;
    try {
      const { employeePhoneNumber, is_authenticated } = employeeStatusSetDto;

      const employee = await this.employeeModel.findByPk(employeePhoneNumber);

      if (!employee) {
        this.logger.error(`${functionName} : Employee does not exist`);
        throw new HttpException(
          'Wrong employee phone number',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!is_authenticated) {
        employee.ticket_code = null;
        employee.is_authenticated = is_authenticated;
        await employee.save();
      } else {
        if (employee.ticket_code === null)
          employee.ticket_code = uuidv4().replace(/-/g, '');
        employee.is_authenticated = is_authenticated;
        await employee.save();
      }
    } catch (error) {
      throw new HttpException(
        `${functionName} ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
