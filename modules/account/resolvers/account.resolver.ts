import { UserProvider } from "./../../user/providers/user.provider";
import { User } from "./../../user/models/user.model";
import { Account } from "./../models/account.model";
import { AccountProvider } from "./../providers/account.provider";
import {
  AccountResolvers,
  MutationResolvers,
  QueryResolvers,
} from "./../../../generated";
import { isAuthenticated } from "../../user/compositions/user.compositions";

export const accountResolvers = {
  Query: {
    currentAccount: async (
      root,
      args,
      { injector, currentUser }
    ): Promise<Account> => {
      return injector.get(AccountProvider).getByUser(currentUser.id);
    },
  } as QueryResolvers,

  Account: {
    admin: async (root, _, { injector }): Promise<User> => {
      if (!root.admin) return null;
      return injector.get(UserProvider).getUserById(String(root.admin), false);
    },
    users: async (root, _, { injector }): Promise<User[]> => {
      if (!root.users) return null;
      return injector.get(UserProvider).getUserByAccounts(root.users as any);
    },
  } as AccountResolvers,

  Mutation: {
    updateAccount: async (_, { id, input }, { injector }): Promise<Account> => {
      return injector.get(AccountProvider).update(id, input);
    },
  } as MutationResolvers,
};

export const accountResolversComposition: any = {
  Query: {
    currentAccount: [isAuthenticated()],
  },
  Mutation: {
    updateAccount: [isAuthenticated()],
  },
};
