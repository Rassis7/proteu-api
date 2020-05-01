import { Ticket } from './../models/ticket.model';
import { TicketProvider } from './../providers/ticket.provider';
import {
  QueryResolvers,
  EventResolvers,
  MutationResolvers,
} from './../../../generated';

export const ticketResolvers = {
  Query: {
    tickets: async (_, args, { injector }): Promise<any> => {
      return injector.get(TicketProvider).getAll();
    },
    ticket: async (_, args, { injector }): Promise<any> => {},
  } as QueryResolvers,
  Event: {} as EventResolvers,
  Mutation: {} as MutationResolvers,
};

export const ticketResolversComposition = {};
