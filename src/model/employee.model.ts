import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Company } from './company.model';
import { Ticket } from './ticket.model';

@Table({ freezeTableName: true })
export class Employee extends Model {
  @Column({ primaryKey: true })
  employee_phone_number: string;

  @ForeignKey(() => Company)
  @Column
  company_id: UUID;

  @Column
  restaurant_id: UUID;

  @Column({ allowNull: true, defaultValue: null })
  ticket_code: UUID;

  @Column
  employee_number: string;

  @Column
  employee_name: string;

  @Column({ defaultValue: false })
  is_authenticated: boolean;

  @BelongsTo(() => Company, 'company_id')
  company: Company;

  @HasMany(() => Ticket)
  ticket: Ticket[];
}
