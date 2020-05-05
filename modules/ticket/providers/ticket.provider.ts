import { ApolloError } from 'apollo-server-core';
import { EventProvider } from './../../event/providers/event.provider';
import {
  TicketStatus,
  CreateTicketInput,
  TicketCategory,
  UpdateTicketInput,
  EventStatus,
  TicketDeletedType,
  DuplicateTicketInput,
} from './../../../generated';
import { Ticket, TicketModel } from './../models/ticket.model';
import { Injectable } from '@graphql-modules/di';
import * as yup from 'yup';

@Injectable()
export class TicketProvider {
  constructor(private readonly eventProvider: EventProvider) {}

  async getAll(eventId: string): Promise<Ticket[]> {
    return TicketModel.find({
      status: TicketStatus.Active,
      event: eventId,
    }).exec();
  }

  async getById(id: string): Promise<Ticket> {
    return TicketModel.findOne({ _id: id, status: TicketStatus.Active }).exec();
  }

  async create(input: CreateTicketInput, userId: string): Promise<Ticket> {
    const ticketValidate = await this.createTicketValidate(input);
    await this.validateEventAndTicket(ticketValidate.event, ticketValidate);
    return TicketModel.create({ ...ticketValidate, user: userId });
  }

  async update(input: UpdateTicketInput): Promise<Ticket> {
    const ticketValidade = await this.updateTicketValidate(input);
    const ticket = await TicketModel.findById(ticketValidade.id);

    await this.validateEventAndTicket(ticket.event.toString(), ticketValidade);

    return TicketModel.findByIdAndUpdate(
      ticketValidade.id,
      { $set: ticketValidade },
      { new: true }
    );
  }

  async delete(id: string): Promise<TicketDeletedType> {
    return TicketModel.findByIdAndUpdate(
      id,
      { $set: { status: TicketStatus.Disabled, deletedAt: new Date() } },
      { new: true }
    );
  }

  // async duplicate(input: DuplicateTicketInput, userId: string) {
  //   const inputValidated = await this.duplicateTicketValidate(input);
  //   const { id, ...rest } = inputValidated

  //   const ticket = await TicketModel.findById(id).exec();
  //   if (!ticket)
  //     throw new ApolloError('The informed ticket does not exist', 'TICKET_NOT_FOUND');

  //   await this.validateEventAndTicket(ticket.event.toString(), rest)
  //   const validadeTicket = await this.createTicketValidate(ticket as CreateTicketInput)
  //   const newTicket = { ...validadeTicket, ...rest }

  //   return TicketModel.create({ ...newTicket, user: userId })
  // }

  // private async duplicateTicketValidate(input: DuplicateTicketInput) {
  //   let { event, name, description, category, ...rest } = this.baseValidate(input)

  //   return yup.object().shape({
  //     id: yup.string().min(1, 'Id cannot be empty').required('Id is required'),
  //     amount: yup.number().integer()
  //       .min(100, 'The minimum value must be 100'),
  //     ...rest
  //   }).validate(input)
  // }

  private async validateEventAndTicket(eventId: string, ticketValidate: any) {
    const event = await this.eventProvider.getById(eventId);

    if (!event || event.status === EventStatus.Disabled)
      throw new ApolloError('The event was not found', 'EVENT_NOT_FOUND');

    if (ticketValidate?.lot?.initial < event.initialDate)
      throw new ApolloError(
        'The batch start date must be greater than the event start date',
        'TICKET_DATE_ERROR'
      );

    if (ticketValidate?.lot?.initial > event.finalDate)
      throw new ApolloError(
        'The batch start date must be less than the event end date',
        'TICKET_DATE_ERROR'
      );

    if (ticketValidate?.lot?.end < event.initialDate)
      throw new ApolloError(
        'The end date of the batch must be greater than the start date of the event',
        'TICKET_DATE_ERROR'
      );

    if (ticketValidate?.lot?.end > event.finalDate)
      throw new ApolloError(
        'The end date of the batch must be less than the end date of the event',
        'TICKET_DATE_ERROR'
      );
  }

  private updateTicketValidate(input: UpdateTicketInput) {
    const { category, ...rest } = this.baseValidate(input);

    return yup
      .object()
      .shape({
        id: yup
          .string()
          .min(1, 'Id cannot be empty')
          .required('Id is required'),
        ...rest,
      })
      .validate(input);
  }

  private createTicketValidate(input: CreateTicketInput) {
    const {
      event,
      name,
      available,
      lot,
      quantityPerPurchase,
      category,
      ...rest
    } = this.baseValidate(input);

    return yup
      .object()
      .shape({
        event: event.required('Event is required'),
        name: name.required('Name is required'),
        available: available.required('Available is required'),
        //Not base
        amount: yup.number().when('category', {
          is: (category) => !category || category === TicketCategory.Paid,
          then: yup
            .number()
            .integer()
            .min(100, 'The minimum value must be 100')
            .required('Amount is required'),
          otherwise: yup.number().strip(),
        }),
        ...rest,
      })
      .validate(input);
  }

  private baseValidate(
    input: CreateTicketInput | UpdateTicketInput | DuplicateTicketInput
  ) {
    return {
      event: yup.string().min(1, 'Event cannot be empty'),
      name: yup.string().min(1, 'Name cannot be empty'),
      description: yup.string().min(1, 'Description cannot be empty'),
      available: yup.number().integer(),
      lot: yup.lazy((lot: any) =>
        lot !== undefined
          ? yup
              .object()
              .shape({
                initial: yup
                  .date()
                  .min(
                    new Date(),
                    'The starting date of the lot must be at least the same as today'
                  )
                  .required('The minimum date must be informed'),
                end: yup
                  .date()
                  .min(
                    input.lot.initial,
                    'The End Date of the lot must be at least equal to the Start Date'
                  )
                  .required('The maximum date must be informed'),
              })
              .required('Lot is required')
          : yup.object().strip()
      ),
      quantityPerPurchase: yup.lazy((quantityPerPurchase: any) =>
        quantityPerPurchase !== undefined
          ? yup
              .object()
              .shape({
                min: yup
                  .number()
                  .integer()
                  .min(1, 'The minimum amount per purchase must be 1'),
                max: yup
                  .number()
                  .integer()
                  .min(
                    input.quantityPerPurchase.min,
                    'The maximum value of the quantity per purchase must be at least equal to the minimum quantity'
                  ),
              })
              .required('QuantityPerPurchase is required')
          : yup.object().strip()
      ),
      category: yup.string().oneOf([TicketCategory.Free, TicketCategory.Paid]),
    };
  }
}
