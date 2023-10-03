import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeOptions: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 8194,
  username: 'root',
  password: 'qwe123',
  database: 'navicode',
  autoLoadModels: true,
  timezone: 'Asia/Seoul',
  synchronize: true,
  // sync: { alter: true },
  // sync: { force: true },
};
