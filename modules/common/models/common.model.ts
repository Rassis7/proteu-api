import { Typegoose, prop } from 'typegoose';

abstract class Common extends Typegoose {
  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;

  @prop()
  deletedAt: Date;
}

export default Common;
