import { ApolloError } from 'apollo-server-core';
import {
  CreateEventInput,
  EventCategory,
  EventVisibility,
  UpdateEventInput,
  EventDeletedType,
  EventStatus,
} from './../../../generated';
import { Injectable } from '@graphql-modules/di';
import { Event, EventModel } from '../models/event.model';
import * as yup from 'yup';

@Injectable()
export class EventProvider {
  async getAll(): Promise<Event[]> {
    return EventModel.find({ status: EventStatus.Active }).exec();
  }

  async getById(eventId: string): Promise<Event> {
    return EventModel.findOne({
      _id: eventId,
      status: EventStatus.Active,
    }).exec();
  }

  async create(input: CreateEventInput): Promise<Event> {
    await this.validadeCreateInput(input);
    return EventModel.create(input);
  }

  async update(input: UpdateEventInput): Promise<Event> {
    await this.validadeUpdateInput(input);
    const { id, ...rest } = input;
    const event = await this.getById(id);

    if (!event || event.status === EventStatus.Disabled)
      throw new ApolloError('The event was not found', 'EVENT_NOT_FOUND');

    if (rest?.finalDate && new Date(rest.finalDate) < event.initialDate)
      throw new ApolloError(
        "The event's end date cannot be less than the start date",
        'DATE_SIZE_ERROR'
      );

    if (rest?.initialDate && new Date(rest.initialDate) > event.finalDate)
      throw new ApolloError(
        'The start date of the event cannot be greater than the end date',
        'DATE_SIZE_ERROR'
      );

    return EventModel.findByIdAndUpdate(
      event.id,
      { $set: rest },
      { new: true }
    );
  }

  async delete(eventId: string): Promise<EventDeletedType> {
    return EventModel.findByIdAndUpdate(
      eventId,
      { $set: { status: EventStatus.Disabled, deletedAt: new Date() } },
      { new: true }
    );
  }

  private validadeCreateInput(
    input: CreateEventInput
  ): Promise<Partial<CreateEventInput>> {
    const { name, description, category, ...model } = this.validadeModel();
    return yup
      .object()
      .shape({
        initialDate: yup
          .date()
          .required('Initial Date is required')
          .min(
            new Date(),
            'The start date must be equal to or greater than today'
          )
          .max(
            new Date(input.finalDate),
            'The start date must be less than or equal to the end date'
          ),
        finalDate: yup.date().required('Final Date is required'),
        name: name.required('Name is required'),
        description: description.required('Description is required'),
        category: category.required('EventCategory is required'),
        ...model,
      })
      .validate(input);
  }

  private validadeUpdateInput(
    input: UpdateEventInput
  ): Promise<Partial<UpdateEventInput>> {
    const model = this.validadeModel();

    return yup
      .object()
      .shape({
        id: yup.string().required('ID is required'),
        initialDate: yup.date(),
        finalDate: yup.date(),
        ...model,
      })
      .validate(input);
  }

  private validadeModel() {
    return {
      name: yup.string(),
      description: yup.string(),
      category: yup
        .string()
        .oneOf([
          EventCategory.Academic,
          EventCategory.Business,
          EventCategory.Cultural,
          EventCategory.Educational,
          EventCategory.Politic,
          EventCategory.Religious,
          EventCategory.Social,
          EventCategory.Sports,
        ]),
      visibility: yup
        .string()
        .oneOf([EventVisibility.Private, EventVisibility.Public])
        .default(EventVisibility.Public),
    };
  }
}
