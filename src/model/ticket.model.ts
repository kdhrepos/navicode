import { UUID } from 'crypto';
import { Table, Column, Model } from 'sequelize-typescript';

@Table({ freezeTableName: true })
export class Ticket extends Model {
  @Column({ primaryKey: true })
  id: UUID;

  @Column
  employee_phone_number: UUID;

  @Column
  restaurant_id: UUID;

  @Column
  company_id: UUID;

  @Column
  employee_count: number;

  @Column
  timestamp: Date;
}
