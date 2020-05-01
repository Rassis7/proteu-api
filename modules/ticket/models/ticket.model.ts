import { TicketCategory, TicketStatus } from './../../../generated';
import { Event } from './../../event/models/event.model';
import { Types } from 'mongoose';
import { prop } from 'typegoose';
import Common from '../../common/models/common.model';

class TicketLot {
  init: Date;
  finish: Date;
}

class TicketQuantityPerPurchase {
  min: number;
  max: number;
}

export class Ticket extends Common {
  id: string;

  _id: string | Types.ObjectId;

  @prop({ ref: Event })
  event: string | Types.ObjectId;

  @prop()
  name: string;

  @prop()
  description: string;

  @prop()
  available: number;

  @prop()
  amount: number;

  @prop()
  lot: TicketLot;

  @prop()
  quantityPerPurchase: TicketQuantityPerPurchase;

  @prop({ enum: TicketCategory, default: TicketCategory.Paid })
  category: TicketCategory;

  @prop({ enum: TicketStatus, default: TicketStatus.Active })
  status: TicketStatus;
}

export const TicketModel = new Ticket().getModelForClass(Ticket, {
  schemaOptions: { timestamps: true, validateBeforeSave: false },
});
