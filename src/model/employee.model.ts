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
  employeePhoneNumber: string;

  @ForeignKey(() => Company)
  @Column
  companyId: UUID;

  @Column
  restaurantId: UUID;

  @Column({ allowNull: true, defaultValue: null })
  ticketCode: UUID;

  @Column
  employeeNumber: string;

  @Column
  employeeName: string;

  @Column({ defaultValue: false })
  isAuthenticated: boolean;

  @BelongsTo(() => Company, 'companyId')
  company: Company;

  @HasMany(() => Ticket)
  ticket: Ticket[];
}
