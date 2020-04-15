import { AccountProvider } from "./../account/providers/account.provider";
import { AccountModule } from "./../account/account.module";
import { GraphQLModule } from "@graphql-modules/core";
import { AppModuleContext, AppModuleSession } from "../../app.module";
import { CommonModule } from "../common/common.module";
import { importSchema } from "../common/utils/schema";
import { UserProvider } from "./providers/user.provider";
import {
  userResolvers,
  userResolversComposition,
} from "./resolvers/user.resolver";

export const UserModule = new GraphQLModule({
  imports: [CommonModule],
  providers: [UserProvider, AccountProvider],
  typeDefs: importSchema(__dirname + "/user.graphql"),
  resolvers: userResolvers,
  resolversComposition: userResolversComposition,
  context: async (
    session: AppModuleSession,
    currentContext: AppModuleContext
  ) => {
    const currentUser = await currentContext.injector
      .get(UserProvider)
      .authorizeUser(currentContext.authToken);

    return { currentUser };
  },
});
