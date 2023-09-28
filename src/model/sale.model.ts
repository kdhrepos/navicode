import { UUID } from 'crypto';
import { Table, Column, Model } from 'sequelize-typescript';

@Table({ freezeTableName: true })
export class Sale extends Model {
  @Column({ primaryKey: true })
  id: UUID;

  @Column
  company_id: UUID;

  @Column
  restaurant_id: UUID;

  @Column
  amount: number;
}
