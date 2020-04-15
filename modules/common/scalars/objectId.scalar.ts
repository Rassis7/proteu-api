import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { isMongoId } from 'validator';

export const GraphQLObjectId = new GraphQLScalarType({
  name: 'ObjectId',
  description: `An unique ID with 24 hexadecimal characters, such as 507f191e810c19729de860ea, as specified in the [MongoDB documentation](https://docs.mongodb.com/manual/reference/method/ObjectId/).`,

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

    if (!isMongoId(ast.value)) {
      throw new TypeError(
        'it must a valid object id (24 hexadecimal characters).',
      );
    }

    return ast.value;
  },
});
