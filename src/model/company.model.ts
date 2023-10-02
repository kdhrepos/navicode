import { UUID } from 'crypto';
import { Table, Column, Model, HasMany, HasOne } from 'sequelize-typescript';
import { Employee } from './employee.model';
import { Contraction } from './contraction.model';
import { Sale } from './sale.model';
import { Ticket } from './ticket.model';
import { Restaurant } from './restaurant.model';

@Table({ freezeTableName: true })
export class Company extends Model {
  // Attributes
  @Column({ primaryKey: true })
  id: UUID;

  @Column
  restaurant_id: UUID;

  @Column({ unique: true })
  company_id: string;

  @Column
  company_password: string;

  @Column
  company_name: string;

  @Column
  restaurant_cost: number;

  // Relations
  @HasOne(() => Contraction)
  contraction: Contraction;

  @HasMany(() => Employee)
  employee: Employee[];

  @HasMany(() => Ticket)
  ticket: Ticket[];

  @HasMany(() => Sale)
  sale: Sale[];
}
