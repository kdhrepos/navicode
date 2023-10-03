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
  restaurantId: UUID;

  @Column({ unique: true })
  companyId: string;

  @Column
  companyPassword: string;

  @Column
  companyName: string;

  @Column
  restaurantCost: number;

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
