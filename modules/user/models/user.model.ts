import { prop, Typegoose } from "typegoose";
import { UserRole, UserStatus } from "../../../generated";
import { Types } from "mongoose";

export class User extends Typegoose {
  id: string;

  _id: string | Types.ObjectId;

  @prop({ enum: UserStatus, default: UserStatus.Active })
  status: UserStatus;

  @prop()
  name: string;

  @prop({ unique: true })
  email: string;

  @prop({ enum: UserRole, default: UserRole.Admin })
  role: UserRole;

  @prop()
  password: string;

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;
}

export const UserModel = new User().getModelForClass(User, {
  schemaOptions: { timestamps: true, validateBeforeSave: false }
});
