import { UUID } from 'crypto';
import { Table, Column, Model } from 'sequelize-typescript';

@Table({ freezeTableName: true })
export class Contraction extends Model {
  @Column({ primaryKey: true })
  restaurant_id: UUID;

  @Column
  company_id: UUID;
}
