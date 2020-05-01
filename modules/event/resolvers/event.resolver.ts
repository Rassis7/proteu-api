import { EventProvider } from './../providers/event.provider';
import { MutationResolvers, EventDeletedType } from './../../../generated';
import { QueryResolvers } from '../../../generated';
import { Event } from '../models/event.model';
import { isAuthenticated } from '../../user/compositions/user.compositions';

export const eventResolvers = {
  Query: {
    events: async (_, args, { injector }): Promise<Event[]> => {
      return injector.get(EventProvider).getAll();
    },
    event: async (_, { id }, { injector }): Promise<Event> => {
      return injector.get(EventProvider).getById(id);
    },
  } as QueryResolvers,

  Mutation: {
    createEvent: async (
      _,
      { input },
      { injector, currentUser }
    ): Promise<Event> => {
      return injector.get(EventProvider).create(input, currentUser.id);
    },
    updateEvent: async (_, { input }, { injector }): Promise<Event> => {
      return injector.get(EventProvider).update(input);
    },
    deleteEvent: async (_, { id }, { injector }): Promise<EventDeletedType> => {
      return injector.get(EventProvider).delete(id);
    },
  } as MutationResolvers,
};

export const eventResolversComposition: any = {
  Query: {
    events: [isAuthenticated()],
    event: [isAuthenticated()],
  },
  Mutation: {
    createEvent: [isAuthenticated()],
    updateEvent: [isAuthenticated()],
    deleteEvent: [isAuthenticated()],
  },
};
