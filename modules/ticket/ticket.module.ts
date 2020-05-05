import { UserModule } from './../user/user.module';
import { GraphQLModule } from '@graphql-modules/core';
import { EventModule } from './../event/event.module';
import { CommonModule } from '../common/common.module';
import { importSchema } from '../common/utils/schema';
import { TicketProvider } from './providers/ticket.provider';
import {
  ticketResolvers,
  ticketResolversComposition,
} from './resolvers/ticket.resolver';

export const TicketModule = new GraphQLModule({
  imports: [CommonModule, UserModule, EventModule],
  providers: [TicketProvider],
  typeDefs: importSchema(__dirname + '/ticket.graphql'),
  resolvers: ticketResolvers,
  resolversComposition: ticketResolversComposition as any,
});
