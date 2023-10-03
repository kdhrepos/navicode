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
  companyId: UUID;

  @ForeignKey(() => Restaurant)
  @Column
  restaurantId: UUID;

  @Column
  amount: number;

  @BelongsTo(() => Company, 'companyId')
  company: Company;

  @BelongsTo(() => Restaurant, 'restaurantId')
  restaurant: Restaurant;
}
