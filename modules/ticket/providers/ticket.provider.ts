import { TicketStatus } from './../../../generated';
import { Ticket, TicketModel } from './../models/ticket.model';
import { Injectable } from '@graphql-modules/di';

@Injectable()
export class TicketProvider {
  async getAll(): Promise<Ticket[]> {
    return TicketModel.find({ status: TicketStatus.Active }).exec();
  }
}
