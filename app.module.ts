import { AccountModule } from "./modules/account/account.module";
import { GraphQLModule, ModuleContext } from "@graphql-modules/core";
import * as fastify from "fastify";
import "reflect-metadata";
import { UserModule } from "./modules/user/user.module";
import { User } from "./modules/user/models/user.model";

export interface AppModuleSession {
  req: fastify.FastifyRequest<any>;
}

export interface AppModuleContext
  extends ModuleContext<{
    currentUser: User;
    // account: Account;
    authToken: string;
  }> {}

export const AppModule = new GraphQLModule({
  imports: [UserModule, AccountModule],
});
