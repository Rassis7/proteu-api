import { EventProvider } from './../../event/providers/event.provider';
import { TicketProvider } from './../providers/ticket.provider';
import {
  QueryResolvers,
  TicketResolvers,
  MutationResolvers,
} from './../../../generated';
import { isAuthenticated } from '../../user/compositions/user.compositions';

export const ticketResolvers = {
  Query: {
    tickets: async (_, { eventId }, { injector }): Promise<any> =>
      injector.get(TicketProvider).getAll(eventId),
    ticket: async (_, { id }, { injector }): Promise<any> =>
      injector.get(TicketProvider).getById(id),
  } as QueryResolvers,
  Ticket: {
    event: async (root, _, { injector }) => {
      if (!root.event) return null;
      return injector.get(EventProvider).getById(String(root.event));
    },
  } as TicketResolvers,
  Mutation: {
    createTicket: async (_, { input }, { injector, currentUser }) =>
      injector.get(TicketProvider).create(input, String(currentUser.id)),
    updateTicket: async (_, { input }, { injector }) =>
      injector.get(TicketProvider).update(input),
    deleteTicket: async (_, { id }, { injector }) =>
      injector.get(TicketProvider).delete(id),
    // duplicateTicket: async (_, { input }, { injector, currentUser }) =>
    //   injector.get(TicketProvider).duplicate(input, String(currentUser.id))
  } as MutationResolvers,
};

export const ticketResolversComposition: any = {
  Query: {
    tickets: [isAuthenticated()],
    ticket: [isAuthenticated()],
  },
  Mutation: {
    createTicket: [isAuthenticated()],
    updateTicket: [isAuthenticated()],
    // duplicateTicket: [isAuthenticated()]
  },
};
