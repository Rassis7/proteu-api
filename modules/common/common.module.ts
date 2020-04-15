import { GraphQLModule } from "@graphql-modules/core";
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from "graphql-iso-date";
import * as GraphQLJSON from "graphql-type-json";
import * as mongoose from "mongoose";
import "reflect-metadata";
import commonConfig from "../../config/db";
import { GraphQLDocumentNumber } from "./scalars/documentNumber.scalar";
import { GraphQLEmailAddress } from "./scalars/emailAddress.scalar";
import { GraphQLObjectId } from "./scalars/objectId.scalar";
import { GraphQLPhoneNumber } from "./scalars/phoneNumber.scalar";
import { GraphQLURL } from "./scalars/url.scalar";
import { extractAuthToken } from "./utils/request";
import { importSchema } from "./utils/schema";
import "./utils/yup";

mongoose
  .connect(commonConfig.mongoUri, {
    dbName: commonConfig.mongoDbName,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  // .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

(mongoose as any).ObjectId.get((v) => v && v.toString()); // converts object ids to strings

export const CommonModule = new GraphQLModule({
  typeDefs: importSchema(__dirname + "/common.graphql"),
  resolvers: {
    JSON: GraphQLJSON as any,
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
    ObjectId: GraphQLObjectId as any,
    EmailAddress: GraphQLEmailAddress as any,
    PhoneNumber: GraphQLPhoneNumber as any,
    URL: GraphQLURL as any,
    DocumentNumber: GraphQLDocumentNumber as any,
  },
  context: (session) => {
    const authorization =
      session && session.headers && session.headers.authorization;
    const authToken = extractAuthToken(authorization);

    return { authToken };
  },
  providers: [
    {
      provide: "mongoose",
      useValue: mongoose,
    },
  ],
});
