import { ApikScopes, ApikStatus } from "./../../../generated";
import { Types } from "mongoose";
import { Typegoose, prop } from "typegoose";

export class APIK extends Typegoose {
  id: string;

  _id: string | Types.ObjectId;

  @prop()
  name: string;

  @prop()
  keyPrefix: string;

  @prop({ enum: ApikScopes })
  scopes: ApikScopes[];

  @prop({ enum: ApikStatus, default: ApikStatus.Active })
  status: ApikStatus;

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;

  @prop()
  deletedAt: Date;
}

export const APIKModel = new APIK().getModelForClass(APIK, {
  schemaOptions: { timestamps: true, validateBeforeSave: false }
});
