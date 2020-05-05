import { UserModule } from './../user/user.module';
import { GraphQLModule } from '@graphql-modules/core';
import { CommonModule } from '../common/common.module';
import { importSchema } from '../common/utils/schema';
import { EventProvider } from './providers/event.provider';
import {
  eventResolvers,
  eventResolversComposition,
} from './resolvers/event.resolver';

export const EventModule = new GraphQLModule({
  imports: [CommonModule, UserModule],
  providers: [EventProvider],
  typeDefs: importSchema(__dirname + '/event.graphql'),
  resolvers: eventResolvers,
  resolversComposition: eventResolversComposition as any,
});
