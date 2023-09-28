import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaleModule } from './sale/sale.module';
import { TicketModule } from './ticket/ticket.module';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [SaleModule, TicketModule, EmployeeModule, CompanyModule, RestaurantModule, DatabaseModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
