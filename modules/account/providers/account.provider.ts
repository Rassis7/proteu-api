import { Injectable } from "@graphql-modules/di";
import { Account, AccountModel } from "./../models/account.model";
import { CreateAccountInput, UpdateAccountInput } from "./../../../generated";

@Injectable()
export class AccountProvider {
  async getByUser(userId: string): Promise<Account> {
    return AccountModel.findOne({ admin: userId }).exec();
  }

  async create(input: CreateAccountInput): Promise<Account> {
    return AccountModel.create(input);
  }

  async update(id: string, input: UpdateAccountInput): Promise<Account> {
    return AccountModel.findByIdAndUpdate(id, { $set: input }, { new: true });
  }
}
