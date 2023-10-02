import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Ticket } from 'src/model/ticket.model';
import { Restaurant } from 'src/model/restaurant.model';
import { Company } from 'src/model/company.model';
import { Employee } from 'src/model/employee.model';
import { Sale } from 'src/model/sale.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Ticket, Restaurant, Company, Employee, Sale]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
