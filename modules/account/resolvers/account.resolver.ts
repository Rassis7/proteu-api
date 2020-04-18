import { UserProvider } from "./../../user/providers/user.provider";
import { User } from "./../../user/models/user.model";
import { Account } from "./../models/account.model";
import { AccountProvider } from "./../providers/account.provider";
import {
  AccountResolvers,
  MutationResolvers,
  QueryResolvers
} from "./../../../generated";
import { isAuthenticated } from "../../user/compositions/user.compositions";

export const accountResolvers = {
  Query: {
    accounts: async (root, _, { injector, currentUser }): Promise<any[]> => {
      return injector.get(AccountProvider).getAccountsByUser(currentUser.id);
    }
  } as QueryResolvers,

  Account: {
    admin: async (root, _, { injector }): Promise<User> => {
      if (!root.admin) return null;
      return injector.get(UserProvider).getUserById(String(root.admin), false);
    }
  } as AccountResolvers,

  Mutation: {
    updateAccount: async (_, { id, input }, { injector }): Promise<Account> => {
      return injector.get(AccountProvider).update(id, input);
    }
  } as MutationResolvers
};

export const accountResolversComposition: any = {
  Query: {
    accounts: [isAuthenticated()]
  },
  Mutation: {
    updateAccount: [isAuthenticated()]
  }
};
