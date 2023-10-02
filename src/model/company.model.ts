import { UUID } from 'crypto';
import { Table, Column, Model } from 'sequelize-typescript';

@Table({ freezeTableName: true })
export class Company extends Model {
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
}
