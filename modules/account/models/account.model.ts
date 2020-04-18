import { User } from "./../../user/models/user.model";
import { prop, Typegoose } from "typegoose";
import { AccountStatus } from "../../../generated";
import { Types } from "mongoose";

export class Account extends Typegoose {
  id: string;

  _id: string | Types.ObjectId;

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
  schemaOptions: { timestamps: true, validateBeforeSave: false }
});
