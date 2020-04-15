import { User } from "./../../user/models/user.model";
import { prop, Typegoose, Ref, arrayProp } from "typegoose";
import { AccountStatus } from "../../../generated";
import { Types } from "mongoose";

export class Account extends Typegoose {
  id: string;

  _id: string | Types.ObjectId;

  @arrayProp({ itemsRef: User })
  users: Ref<User>[];

  @prop({ ref: User })
  admin: string | Types.ObjectId;

  @prop({ enum: AccountStatus, default: AccountStatus.Active })
  status: AccountStatus;

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;
}

export const AccountModel = new Account().getModelForClass(Account, {
  schemaOptions: { timestamps: true, validateBeforeSave: false },
});
