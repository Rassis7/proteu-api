import { User } from './../../user/models/user.model';
import {
  EventCategory,
  EventVisibility,
  EventStatus,
} from './../../../generated';
import { Types } from 'mongoose';
import { prop } from 'typegoose';
import Common from '../../common/models/common.model';

export class LocationEvent {
  lat: string;
  long: string;
}

// export class SocialEvent {
//   instagram?: string;
//   facebook?: string;
//   twitter: string;
//   linkedin: string;
//   site: string;
// }

export class Event extends Common {
  id: string;

  _id: string | Types.ObjectId;

  @prop({ ref: User })
  user: User;

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

  @prop({ ref: User })
  createdBy: User;

  @prop()
  initialDate: Date;

  @prop()
  finalDate: Date;
}

export const EventModel = new Event().getModelForClass(Event, {
  schemaOptions: { timestamps: true, validateBeforeSave: false },
});
