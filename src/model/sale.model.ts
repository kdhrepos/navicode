import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Company } from './company.model';
import { Restaurant } from './restaurant.model';

@Table({ freezeTableName: true })
export class Sale extends Model {
  @Column({ primaryKey: true })
  id: UUID;

  @ForeignKey(() => Company)
  @Column
  company_id: UUID;

  @ForeignKey(() => Restaurant)
  @Column
  restaurant_id: UUID;

  @Column
  amount: number;

  Relations;
  @BelongsTo(() => Company, 'company_id')
  company: Company;

  @BelongsTo(() => Restaurant, 'restaurant_id')
  restaurant: Restaurant;
}
