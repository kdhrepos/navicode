import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaleModule } from './sale/sale.module';
import { TicketModule } from './ticket/ticket.module';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseOptions } from './database/database.options';

@Module({
  imports: [
    SaleModule,
    TicketModule,
    EmployeeModule,
    CompanyModule,
    RestaurantModule,
    SequelizeModule.forRoot({
      // databaseOptions,
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qwe123',
      database: 'navicode',
      autoLoadModels: true,
      // sync : ({alter : true}),
      // sync : ({force : true}),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
