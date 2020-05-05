import { Types } from 'mongoose';
import { Injectable } from '@graphql-modules/di';
import { AuthenticationError, ApolloError } from 'apollo-server-core';
import * as argon2 from 'argon2';
import { signToken, verifyToken } from '../../common/utils/jwt';
import {
  AuthenticateInput,
  UserStatus,
  CreateUserInput,
  UpdateUserInput,
} from '../../../generated';
import { UserModel, User } from '../models/user.model';

@Injectable()
export class UserProvider {
  async createUser(input: CreateUserInput) {
    const userInput = {
      ...input,
      password: await argon2.hash(input.password),
    };

    try {
      const user = await UserModel.create(userInput);

      return user;
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ApolloError(
          'A user with the specified email already exists',
          'EMAIL_ALREADY_EXISTS'
        );
      }

      throw err;
    }
  }

  async getUserById(
    id: string,
    returnPassword: boolean = false
  ): Promise<User> {
    if (returnPassword) {
      return UserModel.findById(id);
    } else {
      return UserModel.findById(id, '+password');
    }
  }

  async getUserByEmail(
    email: string,
    returnPassword: boolean = false
  ): Promise<User> {
    if (returnPassword) {
      return UserModel.findOne(
        {
          email,
        },
        '+password'
      );
    } else {
      return UserModel.findOne({
        email,
      });
    }
  }

  async getActiveUserById(id: string): Promise<User> {
    const user = await this.getUserById(id);

    if (user && user.status === UserStatus.Active) {
      return user;
    }

    return null;
  }

  async authenticate(input: AuthenticateInput): Promise<User> {
    const user = await this.getUserByEmail(input.email, true);

    if (!user) {
      throw new AuthenticationError('User not found.');
    }

    if (user.status !== UserStatus.Active) {
      throw new AuthenticationError('User is not active.');
    }

    const isPasswordValid = await argon2.verify(user.password, input.password);

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid password.');
    }

    return user;
  }

  async updateUser(user: User, input: UpdateUserInput): Promise<User> {
    if (input.password) {
      input.password = await argon2.hash(input.password);
    }

    return UserModel.findByIdAndUpdate(user.id, input, { new: true });
  }

  async authorizeUser(token: string): Promise<User> {
    /**
     * Since logging in and setting the authorization header can be very
     * boring in development, we return the first user in the database.
     */
    // if (!token) {
    //   return ["development", "test"].includes(process.env.NODE_ENV)
    //     ? this.getActiveUserById("usr_cjzbl0m82000001mg4dcn48po")
    //     : null;
    // }

    try {
      const tokenPayload = verifyToken(token, 'user');
      return this.getActiveUserById(tokenPayload.sub);
    } catch (error) {}

    return null;
  }

  generateToken(userId: string): string {
    return signToken({
      audience: 'user',
      expiresIn: '30d',
      subject: userId,
    });
  }
}
