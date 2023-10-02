import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Company } from './company.model';
import { Restaurant } from './restaurant.model';

@Table({ freezeTableName: true })
export class Contraction extends Model {
  @ForeignKey(() => Company)
  @Column({ primaryKey: true })
  company_id: UUID;

  @ForeignKey(() => Restaurant)
  @Column
  restaurant_id: UUID;

  @BelongsTo(() => Company, 'company_id')
  company: Company;

  @BelongsTo(() => Restaurant, 'restaurant_id')
  restaurant: Restaurant;
}
