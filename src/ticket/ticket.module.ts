import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Ticket } from 'src/model/ticket.model';

@Module({
  imports: [SequelizeModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
