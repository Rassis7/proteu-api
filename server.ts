import { ApolloServer } from "apollo-server-fastify";
import * as fastify from "fastify";
import * as fastifyCors from "fastify-cors";
import * as yup from "yup";
import { AppModule } from "./app.module";
import { logger } from "./modules/common/utils/logger";

const server = new ApolloServer({
  schema: AppModule.schema,
  context: (session) => session,
  playground: ["development", "staging"].includes(process.env.NODE_ENV),
  introspection: true,
  tracing: process.env.NODE_ENV === "development",
  engine: {
    schemaTag: process.env.NODE_ENV === "production" ? "prod" : "stage",
  },
  // todo: add request, user, account, visitor, ip
  formatError: (error) => {
    const hasOriginalError =
      error.originalError && error.originalError instanceof Error;
    const errorCode = error && error.extensions && error.extensions.code;
    const isValidationError =
      error.originalError instanceof yup.ValidationError;
    const isInternalError = !errorCode || errorCode === "INTERNAL_SERVER_ERROR";
    const isUnhandledError =
      hasOriginalError && isInternalError && !isValidationError;

    if (error.originalError instanceof yup.ValidationError) {
      return {
        message: error.originalError.message,
        path: error.originalError.path && error.originalError.path.split("."),
        locations: null,
        constraints: error.originalError.params,
        extensions: {
          code: "ARGUMENT_VALIDATION_ERROR",
        },
      };
    }

    if (isUnhandledError) {
      logger.error(error.originalError);

      return {
        message: "An internal error ocurred.",
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
        locations: null,
        path: null,
      };
    }

    return error;
  },
});

const app = fastify();

app.register(server.createHandler({ path: "/graphql" }));
app.register(fastifyCors, {
  origin: true,
});

app
  .listen(4000, process.env.SERVER_HOST)
  .then((url) => {
    logger.info(`🚀  Server ready at ${url}/graphql`);
  })
  .catch((error) => logger.error(error));
