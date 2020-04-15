import { isValidCnpj, isValidCpf } from '@brazilian-utils/validators';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

export const GraphQLDocumentNumber = new GraphQLScalarType({
  name: 'DocumentNumber',
  // todo: add examples
  description: `A valid brazillian document number (CPF/CNPJ).
  
  **Examples:**
  * 13996518706
  * 139.965.187-06
  * 90281820000191
  * 90.281.820/0001-91
  `,

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

    if (isValidCpf(ast.value) || isValidCnpj(ast.value)) {
      return ast.value;
    }

    throw new TypeError('it must be a valid document number.');
  },
});
