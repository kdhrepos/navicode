import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaleModule } from './sale/sale.module';
import { TicketModule } from './ticket/ticket.module';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeOptions } from './database/sequelize.options';
import { HTTPLoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    SaleModule,
    TicketModule,
    EmployeeModule,
    CompanyModule,
    RestaurantModule,
    SequelizeModule.forRoot(sequelizeOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HTTPLoggerMiddleware).forRoutes('*');
  }
}
