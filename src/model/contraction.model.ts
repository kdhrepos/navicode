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
  companyId: UUID;

  @ForeignKey(() => Restaurant)
  @Column
  restaurantId: UUID;

  @BelongsTo(() => Company, 'companyId')
  company: Company;

  @BelongsTo(() => Restaurant, 'restaurantId')
  restaurant: Restaurant;
}
