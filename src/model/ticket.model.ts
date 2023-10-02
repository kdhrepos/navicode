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
  employee_phone_number: UUID;

  @ForeignKey(() => Restaurant)
  @Column
  restaurant_id: UUID;

  @ForeignKey(() => Company)
  @Column
  company_id: UUID;

  @Column
  employee_count: number;

  @Column
  timestamp: Date;

  @BelongsTo(() => Employee, 'employee_phone_number')
  employee: Employee;

  @BelongsTo(() => Company, 'company_id')
  company: Company;

  @BelongsTo(() => Restaurant, 'restaurant_id')
  restaurant: Restaurant;
}
