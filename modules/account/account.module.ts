import { GraphQLModule } from "@graphql-modules/core";
import { CommonModule } from "../common/common.module";
import { UserModule } from "./../user/user.module";
import { importSchema } from "../common/utils/schema";
import { AccountProvider } from "./providers/account.provider";
import {
  accountResolvers,
  accountResolversComposition
} from "./resolvers/account.resolver";

export const AccountModule = new GraphQLModule({
  imports: [CommonModule, UserModule],
  providers: [AccountProvider],
  typeDefs: importSchema(__dirname + "/account.graphql"),
  resolvers: accountResolvers,
  resolversComposition: accountResolversComposition as any
});
