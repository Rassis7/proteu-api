import { prop } from 'typegoose';
import { UserRole, UserStatus } from '../../../generated';
import { Types } from 'mongoose';
import Common from '../../common/models/common.model';

export class User extends Common {
  id: string;

  _id: string | Types.ObjectId;

  @prop({ enum: UserStatus, default: UserStatus.Active })
  status: UserStatus;

  @prop()
  name: string;

  @prop({ unique: true })
  email: string;

  @prop({ enum: UserRole, default: UserRole.Basic })
  role: UserRole;

  @prop()
  password: string;
}

export const UserModel = new User().getModelForClass(User, {
  schemaOptions: { timestamps: true, validateBeforeSave: false },
});
