import { APIKProvider } from "./../providers/apik.provider";
import { APIK } from "./../models/apik.models";
import { ApikCreatedType, MutationResolvers } from "./../../../generated";
import { isAuthenticated } from "../../user/compositions/user.compositions";

export const apikReolvers = {
  Mutation: {
    create: async (
      _,
      { input },
      { injector, currentUser }
    ): Promise<Partial<ApikCreatedType>> => {
      return injector.get(APIKProvider).create(input, currentUser);
    }
  } as MutationResolvers
};

export const apikResolversComposition: any = {
  Mutation: {
    create: [isAuthenticated()]
    // update: [isAuthenticated()],
    // delete: [isAuthenticated()],
  }
};
