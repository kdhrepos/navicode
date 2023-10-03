import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Employee } from './employee.model';
import { Restaurant } from './restaurant.model';
import { Company } from './company.model';

@Table({ freezeTableName: true })
export class Ticket extends Model {
  @Column({ primaryKey: true })
  id: UUID;

  @ForeignKey(() => Employee)
  @Column
  employeePhoneNumber: UUID;

  @ForeignKey(() => Restaurant)
  @Column
  restaurantId: UUID;

  @ForeignKey(() => Company)
  @Column
  companyId: UUID;

  @Column
  employeeCount: number;

  @Column
  timeStamp: Date;

  @BelongsTo(() => Employee, 'employeePhoneNumber')
  employee: Employee;

  @BelongsTo(() => Company, 'companyId')
  company: Company;

  @BelongsTo(() => Restaurant, 'restaurantId')
  restaurant: Restaurant;
}
