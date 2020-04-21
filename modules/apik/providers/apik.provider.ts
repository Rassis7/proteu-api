import { ApolloError } from "apollo-server-core";
import { AccountModel } from "./../../account/models/account.model";
import { APIK, APIKModel } from "./../models/apik.models";
import { User } from "./../../user/models/user.model";
import { CreateApikInput, ApikScopes, ApikStatus } from "./../../../generated";
import { Injectable } from "@graphql-modules/di";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class APIKProvider {
  async create(input: CreateApikInput, currentUser: User) {
    await this.validateCreateAPIKInput(input);

    const account = await AccountModel.findById(input.accountId);
    if (!account)
      throw new ApolloError("No account found", "ACCOUNT_NOT_FOUND");

    if (account.admin !== currentUser.id)
      throw new ApolloError(
        "Check if the account you reported belongs to your user",
        "ACCOUNT_FORBIDDEN"
      );

    //created prefix
    const keyPrefix = `${input.name.charAt(3)}${uuidv4()}`;

    const apikCreated = await APIKModel.create({ keyPrefix, ...input });

    //updated account
    await AccountModel.findByIdAndUpdate(account.id, {
      $set: {
        apik: apikCreated.id
      }
    });

    // const key = this.generateApiKey(keyPrefix);
    const key = "";

    return { key, ...apikCreated };
  }

  private validateCreateAPIKInput(
    input: CreateApikInput
  ): Promise<Partial<CreateApikInput>> {
    return yup
      .object()
      .shape({
        name: yup
          .string()
          .required("Name is required")
          .min(3, "The name must be at least 3 characters"),
        scopes: yup
          .string()
          .oneOf([
            ApikScopes.InvalidateTicket,
            ApikScopes.ResendTicketsByEmail,
            ApikScopes.SendTicketsByEmail,
            ApikScopes.TicketCreate,
            ApikScopes.TicketUpdate
          ])
          .required("Scopes is required"),
        // status: yup.string().oneOf([ApikStatus.Active, ApikStatus.Disabled]),
        accountId: yup.string().required("AccountId is required")
      })
      .validate(input);
  }
}
