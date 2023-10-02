import { UUID } from 'crypto';
import { Table, Column, Model, HasMany, BelongsTo } from 'sequelize-typescript';
import { Ticket } from './ticket.model';
import { Sale } from './sale.model';
import { Contraction } from './contraction.model';

@Table({ freezeTableName: true })
export class Restaurant extends Model {
  @Column({ primaryKey: true })
  id: UUID;

  @Column
  cost: number;

  @Column
  restaurant_name: string;

  @HasMany(() => Ticket)
  ticket: Ticket[];

  @HasMany(() => Sale)
  sale: Sale[];

  @HasMany(() => Contraction)
  contraction: Contraction[];
}
