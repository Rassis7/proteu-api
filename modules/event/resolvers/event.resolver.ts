import { EventProvider } from './../providers/event.provider';
import { User } from './../../user/models/user.model';
import { MutationResolvers, EventDeletedType } from './../../../generated';
import { QueryResolvers } from '../../../generated';
import { Event } from '../models/event.model';

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
    createEvent: async (_, { input }, { injector }): Promise<Event> => {
      return injector.get(EventProvider).create(input);
    },
    updateEvent: async (_, { input }, { injector }): Promise<Event> => {
      return injector.get(EventProvider).update(input);
    },
    deleteEvent: async (_, { id }, { injector }): Promise<EventDeletedType> => {
      return injector.get(EventProvider).delete(id);
    },
  } as MutationResolvers,
};

export const eventResolversComposition = {};
