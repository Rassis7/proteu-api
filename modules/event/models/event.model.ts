import {
  EventCategory,
  EventVisibility,
  EventStatus,
} from './../../../generated';
import { Types } from 'mongoose';
import { Typegoose, prop } from 'typegoose';

export class LocationEvent {
  lat: string;
  long: string;
}

// export class SocialEvent {
//   instagram?: string;
//   facebook?: string;
//   twitter: string;
//   linkedin: string;
// }

export class Event extends Typegoose {
  id: string;

  _id: string | Types.ObjectId;

  @prop()
  name: string;

  @prop()
  description: string;

  // @prop()
  // image?: string;

  // @prop()
  // video?: string;

  // @prop()
  // location?: LocationEvent;

  @prop({ enum: EventCategory })
  category: EventCategory;

  @prop({ enum: EventStatus, default: EventStatus.Active })
  status: EventStatus;

  @prop({ enum: EventVisibility, default: EventVisibility.Public })
  visibility: EventVisibility;

  // @prop()
  // social?: SocialEvent;

  // @prop({ ref: Account })
  // account: string | Types.ObjectId;

  @prop()
  initialDate: Date;

  @prop()
  finalDate: Date;

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;

  @prop()
  deletedAt: Date;
}

export const EventModel = new Event().getModelForClass(Event, {
  schemaOptions: { timestamps: true, validateBeforeSave: false },
});
