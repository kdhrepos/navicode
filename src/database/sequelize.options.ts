import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeOptions: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'qwe123',
  database: 'navicode',
  autoLoadModels: true,
  synchronize: true,
  // sync: { alter: true },
  // sync: { force: true },
};
