import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { isURL } from 'validator';

export const GraphQLURL = new GraphQLScalarType({
  name: 'URL',
  description: `A valid HTTP/HTTPS URL.`,

  serialize(value) {
    return value;
  },

  parseValue(value) {
    return value;
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('it must be a string.');
    }

    if (
      !isURL(ast.value, { protocols: ['http', 'https'], require_tld: false })
    ) {
      throw new TypeError('it must be a valid URL.');
    }

    return ast.value;
  },
});
