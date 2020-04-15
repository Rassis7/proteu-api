import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';
import { isEmail } from 'validator';

export const GraphQLEmailAddress = new GraphQLScalarType({
  name: 'EmailAddress',
  description: `A valid email address as specified in [RFC822](https://www.w3.org/Protocols/rfc822/).`,

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

    if (!isEmail(ast.value)) {
      throw new TypeError('it must be a valid email address.');
    }

    return ast.value;
  },
});
