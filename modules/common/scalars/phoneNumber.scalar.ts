import { isValidPhone } from '@brazilian-utils/validators';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

export const GraphQLPhoneNumber = new GraphQLScalarType({
  name: 'PhoneNumber',
  // todo: add examples
  description: `A valid brazillian phone number.`,

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

    if (!isValidPhone(ast.value)) {
      throw new TypeError('it must be a valid phone number.');
    }

    return ast.value;
  },
});
