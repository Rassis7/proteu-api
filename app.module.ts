import { GraphQLModule, ModuleContext } from '@graphql-modules/core';
import * as fastify from 'fastify';
import 'reflect-metadata';
import { User } from './modules/user/models/user.model';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/event/event.module';

export interface AppModuleSession {
  req: fastify.FastifyRequest<any>;
}

export interface AppModuleContext
  extends ModuleContext<{
    currentUser: User;
    authToken: string;
  }> {}

export const AppModule = new GraphQLModule({
  imports: [AccountModule, UserModule, EventModule],
});
