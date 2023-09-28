import { UUID } from 'crypto';
import { Table, Column, Model } from 'sequelize-typescript';

@Table({ freezeTableName: true })
export class Restaurant extends Model {
  @Column({ primaryKey: true })
  id: UUID;

  @Column
  cost: number;

  @Column
  restaurant_name: string;
}
