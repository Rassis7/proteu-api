import { AccountProvider } from "./../../account/providers/account.provider";
import { UserResolvers } from "./../../../generated";
import { QueryResolvers, MutationResolvers } from "../../../generated";
import { UserProvider } from "../providers/user.provider";
import { isAuthenticated } from "../compositions/user.compositions";
import { Account } from "../../account/models/account.model";

export const userResolvers = {
  Query: {
    currentUser: async (root, args, { currentUser }) => currentUser
  } as QueryResolvers,

  Mutation: {
    authenticate: async (root, { input }, { injector }) => {
      const user = await injector.get(UserProvider).authenticate(input);
      const token = injector.get(UserProvider).generateToken(user.id);

      return { token, user };
    },
    createUser: async (root, { input }, { injector }) => {
      return injector.get(UserProvider).createUser(input);
    },
    updateUser: async (root, { input }, { injector, currentUser: user }) => {
      return injector.get(UserProvider).updateUser(user, input);
    }
  } as MutationResolvers
};

export const userResolversComposition: any = {
  Query: {
    currentUser: [isAuthenticated()]
  },
  Mutation: {
    createUser: [],
    authenticate: [],
    updateUser: [isAuthenticated()]
  }
};
