import { Injectable } from '@graphql-modules/di';
import { Account, AccountModel } from './../models/account.model';
import { CreateAccountInput, UpdateAccountInput } from './../../../generated';

@Injectable()
export class AccountProvider {
  async getAccountsByUser(userId: string): Promise<Account[]> {
    return AccountModel.find({ admin: userId }).exec();
  }

  async create(input: CreateAccountInput): Promise<Account> {
    return AccountModel.create(input);
  }

  async update(input: UpdateAccountInput): Promise<Account> {
    const { id, ...rest } = input;
    return AccountModel.findByIdAndUpdate(id, { $set: rest }, { new: true });
  }
}
