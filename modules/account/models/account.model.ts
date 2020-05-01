import { User } from './../../user/models/user.model';
import { prop } from 'typegoose';
import { AccountStatus } from '../../../generated';
import { Types } from 'mongoose';
import Common from '../../common/models/common.model';

export class Account extends Common {
  id: string;

  _id: string | Types.ObjectId;

  @prop({ ref: User })
  admin: string | Types.ObjectId;

  @prop({ enum: AccountStatus, default: AccountStatus.Active })
  status: AccountStatus;
}

export const AccountModel = new Account().getModelForClass(Account, {
  schemaOptions: { timestamps: true, validateBeforeSave: false },
});
