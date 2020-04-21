import { GraphQLModule } from "@graphql-modules/core";
import { CommonModule } from "../common/common.module";
import { UserModule } from "./../user/user.module";
import { importSchema } from "../common/utils/schema";
import { APIKProvider } from "./providers/apik.provider";
import {
  apikReolvers,
  apikResolversComposition
} from "./resolvers/apik.resolver";

export const APIKModule = new GraphQLModule({
  imports: [CommonModule, UserModule],
  providers: [APIKProvider],
  typeDefs: importSchema(__dirname + "/apik.graphql"),
  resolvers: apikReolvers,
  resolversComposition: apikResolversComposition as any
});
