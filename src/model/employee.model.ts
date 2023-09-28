import { UUID } from 'crypto';
import { Table, Column, Model } from 'sequelize-typescript';

@Table({ freezeTableName: true })
export class Employee extends Model {
  @Column({ primaryKey: true })
  employee_phone_number: string;

  @Column
  company_id: UUID;

  @Column
  restaurant_id: UUID;

  @Column({ allowNull: true })
  ticket_code: UUID;

  @Column
  employee_number: number;

  @Column
  employee_name: string;

  @Column({ defaultValue: false })
  is_authenticated: boolean;
}
