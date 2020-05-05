import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { AppModuleContext } from './app.module';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EmailAddress: string;
  DateTime: Date;
  ObjectId: string;
  JSON: { [key: string]: any };
  Date: Date;
  Time: string;
  PhoneNumber: string;
  DocumentNumber: string;
  URL: string;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  admin: User;
  status?: Maybe<AccountStatus>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
}

export type AuthenticateInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type AuthenticatePayload = {
  __typename?: 'AuthenticatePayload';
  token: Scalars['String'];
  user: User;
};

export type CreateAccountInput = {
  admin: Scalars['ID'];
};

export type CreateEventInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  category: EventCategory;
  visibility?: Maybe<EventVisibility>;
  initialDate: Scalars['DateTime'];
  finalDate: Scalars['DateTime'];
};

export type CreateTicketInput = {
  event: Scalars['ObjectId'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  available: Scalars['Int'];
  amount?: Maybe<Scalars['Int']>;
  lot: TicketLotInput;
  quantityPerPurchase?: Maybe<TicketQuantityPerPurchaseInput>;
  category?: Maybe<TicketCategory>;
};

export type CreateUserInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
  name: Scalars['String'];
};

export enum Currency {
  Brl = 'BRL',
}

export type DuplicateTicketInput = {
  id: Scalars['ObjectId'];
  available?: Maybe<Scalars['Int']>;
  amount?: Maybe<Scalars['Int']>;
  lot?: Maybe<TicketLotInput>;
  quantityPerPurchase?: Maybe<TicketQuantityPerPurchaseInput>;
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  category: EventCategory;
  status: EventStatus;
  visibility: EventVisibility;
  initialDate: Scalars['DateTime'];
  finalDate: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
};

export enum EventCategory {
  Social = 'SOCIAL',
  Business = 'BUSINESS',
  Religious = 'RELIGIOUS',
  Academic = 'ACADEMIC',
  Cultural = 'CULTURAL',
  Sports = 'SPORTS',
  Politic = 'POLITIC',
  Educational = 'EDUCATIONAL',
}

export type EventDeletedType = {
  __typename?: 'EventDeletedType';
  id: Scalars['ID'];
  status: EventStatus;
  deletedAt: Scalars['DateTime'];
};

export enum EventStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
}

export enum EventVisibility {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type File = {
  __typename?: 'File';
  name: Scalars['String'];
  mimeType: Scalars['String'];
  url: Scalars['URL'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateAccount: Account;
  createEvent: Event;
  updateEvent: Event;
  deleteEvent: EventDeletedType;
  createTicket: Ticket;
  updateTicket: Ticket;
  deleteTicket: TicketDeletedType;
  authenticate: AuthenticatePayload;
  createUser: User;
  updateUser: User;
};

export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};

export type MutationCreateEventArgs = {
  input?: Maybe<CreateEventInput>;
};

export type MutationUpdateEventArgs = {
  input?: Maybe<UpdateEventInput>;
};

export type MutationDeleteEventArgs = {
  id: Scalars['ID'];
};

export type MutationCreateTicketArgs = {
  input?: Maybe<CreateTicketInput>;
};

export type MutationUpdateTicketArgs = {
  input?: Maybe<UpdateTicketInput>;
};

export type MutationDeleteTicketArgs = {
  id: Scalars['ID'];
};

export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  accounts: Array<Maybe<Account>>;
  events?: Maybe<Array<Event>>;
  event?: Maybe<Event>;
  tickets?: Maybe<Array<Ticket>>;
  ticket?: Maybe<Ticket>;
  currentUser: User;
};

export type QueryEventArgs = {
  id: Scalars['ID'];
};

export type QueryTicketsArgs = {
  eventId: Scalars['ID'];
};

export type QueryTicketArgs = {
  id: Scalars['ID'];
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['ID'];
  event: Event;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  available: Scalars['Int'];
  amount?: Maybe<Scalars['Int']>;
  lot: TicketLot;
  quantityPerPurchase: TicketQuantityPerPurchase;
  category: TicketCategory;
  status: TicketStatus;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
};

export enum TicketCategory {
  Free = 'FREE',
  Paid = 'PAID',
}

export type TicketDeletedType = {
  __typename?: 'TicketDeletedType';
  id: Scalars['ID'];
  status: TicketStatus;
  deletedAt: Scalars['DateTime'];
};

export type TicketLot = {
  __typename?: 'TicketLot';
  initial: Scalars['DateTime'];
  end: Scalars['DateTime'];
};

export type TicketLotInput = {
  initial: Scalars['DateTime'];
  end: Scalars['DateTime'];
};

export type TicketQuantityPerPurchase = {
  __typename?: 'TicketQuantityPerPurchase';
  min: Scalars['Int'];
  max: Scalars['Int'];
};

export type TicketQuantityPerPurchaseInput = {
  min: Scalars['Int'];
  max: Scalars['Int'];
};

export enum TicketStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
}

export type UpdateAccountInput = {
  id: Scalars['ID'];
  admin: Scalars['ID'];
  status?: Maybe<AccountStatus>;
};

export type UpdateEventInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  category?: Maybe<EventCategory>;
  visibility?: Maybe<EventVisibility>;
  initialDate?: Maybe<Scalars['DateTime']>;
  finalDate?: Maybe<Scalars['DateTime']>;
};

export type UpdateTicketInput = {
  id: Scalars['ObjectId'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  available?: Maybe<Scalars['Int']>;
  lot?: Maybe<TicketLotInput>;
  quantityPerPurchase?: Maybe<TicketQuantityPerPurchaseInput>;
};

export type UpdateUserInput = {
  email?: Maybe<Scalars['EmailAddress']>;
  password?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  status: UserStatus;
  name?: Maybe<Scalars['String']>;
  email: Scalars['EmailAddress'];
  role: UserRole;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Basic = 'BASIC',
}

export enum UserStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Account: ResolverTypeWrapper<Partial<Account>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  User: ResolverTypeWrapper<Partial<User>>;
  UserStatus: ResolverTypeWrapper<Partial<UserStatus>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  EmailAddress: ResolverTypeWrapper<Partial<Scalars['EmailAddress']>>;
  UserRole: ResolverTypeWrapper<Partial<UserRole>>;
  DateTime: ResolverTypeWrapper<Partial<Scalars['DateTime']>>;
  AccountStatus: ResolverTypeWrapper<Partial<AccountStatus>>;
  Event: ResolverTypeWrapper<Partial<Event>>;
  EventCategory: ResolverTypeWrapper<Partial<EventCategory>>;
  EventStatus: ResolverTypeWrapper<Partial<EventStatus>>;
  EventVisibility: ResolverTypeWrapper<Partial<EventVisibility>>;
  Ticket: ResolverTypeWrapper<Partial<Ticket>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>;
  TicketLot: ResolverTypeWrapper<Partial<TicketLot>>;
  TicketQuantityPerPurchase: ResolverTypeWrapper<
    Partial<TicketQuantityPerPurchase>
  >;
  TicketCategory: ResolverTypeWrapper<Partial<TicketCategory>>;
  TicketStatus: ResolverTypeWrapper<Partial<TicketStatus>>;
  Mutation: ResolverTypeWrapper<{}>;
  UpdateAccountInput: ResolverTypeWrapper<Partial<UpdateAccountInput>>;
  CreateEventInput: ResolverTypeWrapper<Partial<CreateEventInput>>;
  UpdateEventInput: ResolverTypeWrapper<Partial<UpdateEventInput>>;
  EventDeletedType: ResolverTypeWrapper<Partial<EventDeletedType>>;
  CreateTicketInput: ResolverTypeWrapper<Partial<CreateTicketInput>>;
  ObjectId: ResolverTypeWrapper<Partial<Scalars['ObjectId']>>;
  TicketLotInput: ResolverTypeWrapper<Partial<TicketLotInput>>;
  TicketQuantityPerPurchaseInput: ResolverTypeWrapper<
    Partial<TicketQuantityPerPurchaseInput>
  >;
  UpdateTicketInput: ResolverTypeWrapper<Partial<UpdateTicketInput>>;
  TicketDeletedType: ResolverTypeWrapper<Partial<TicketDeletedType>>;
  AuthenticateInput: ResolverTypeWrapper<Partial<AuthenticateInput>>;
  AuthenticatePayload: ResolverTypeWrapper<Partial<AuthenticatePayload>>;
  CreateUserInput: ResolverTypeWrapper<Partial<CreateUserInput>>;
  UpdateUserInput: ResolverTypeWrapper<Partial<UpdateUserInput>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  CreateAccountInput: ResolverTypeWrapper<Partial<CreateAccountInput>>;
  JSON: ResolverTypeWrapper<Partial<Scalars['JSON']>>;
  Date: ResolverTypeWrapper<Partial<Scalars['Date']>>;
  Time: ResolverTypeWrapper<Partial<Scalars['Time']>>;
  PhoneNumber: ResolverTypeWrapper<Partial<Scalars['PhoneNumber']>>;
  DocumentNumber: ResolverTypeWrapper<Partial<Scalars['DocumentNumber']>>;
  URL: ResolverTypeWrapper<Partial<Scalars['URL']>>;
  Currency: ResolverTypeWrapper<Partial<Currency>>;
  File: ResolverTypeWrapper<Partial<File>>;
  DuplicateTicketInput: ResolverTypeWrapper<Partial<DuplicateTicketInput>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Account: Partial<Account>;
  ID: Partial<Scalars['ID']>;
  User: Partial<User>;
  UserStatus: Partial<UserStatus>;
  String: Partial<Scalars['String']>;
  EmailAddress: Partial<Scalars['EmailAddress']>;
  UserRole: Partial<UserRole>;
  DateTime: Partial<Scalars['DateTime']>;
  AccountStatus: Partial<AccountStatus>;
  Event: Partial<Event>;
  EventCategory: Partial<EventCategory>;
  EventStatus: Partial<EventStatus>;
  EventVisibility: Partial<EventVisibility>;
  Ticket: Partial<Ticket>;
  Int: Partial<Scalars['Int']>;
  TicketLot: Partial<TicketLot>;
  TicketQuantityPerPurchase: Partial<TicketQuantityPerPurchase>;
  TicketCategory: Partial<TicketCategory>;
  TicketStatus: Partial<TicketStatus>;
  Mutation: {};
  UpdateAccountInput: Partial<UpdateAccountInput>;
  CreateEventInput: Partial<CreateEventInput>;
  UpdateEventInput: Partial<UpdateEventInput>;
  EventDeletedType: Partial<EventDeletedType>;
  CreateTicketInput: Partial<CreateTicketInput>;
  ObjectId: Partial<Scalars['ObjectId']>;
  TicketLotInput: Partial<TicketLotInput>;
  TicketQuantityPerPurchaseInput: Partial<TicketQuantityPerPurchaseInput>;
  UpdateTicketInput: Partial<UpdateTicketInput>;
  TicketDeletedType: Partial<TicketDeletedType>;
  AuthenticateInput: Partial<AuthenticateInput>;
  AuthenticatePayload: Partial<AuthenticatePayload>;
  CreateUserInput: Partial<CreateUserInput>;
  UpdateUserInput: Partial<UpdateUserInput>;
  Boolean: Partial<Scalars['Boolean']>;
  CreateAccountInput: Partial<CreateAccountInput>;
  JSON: Partial<Scalars['JSON']>;
  Date: Partial<Scalars['Date']>;
  Time: Partial<Scalars['Time']>;
  PhoneNumber: Partial<Scalars['PhoneNumber']>;
  DocumentNumber: Partial<Scalars['DocumentNumber']>;
  URL: Partial<Scalars['URL']>;
  Currency: Partial<Currency>;
  File: Partial<File>;
  DuplicateTicketInput: Partial<DuplicateTicketInput>;
};

export type AccountResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['Account']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  admin?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  status?: Resolver<
    Maybe<ResolversTypes['AccountStatus']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type AuthenticatePayloadResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['AuthenticatePayload']
> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DocumentNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DocumentNumber'], any> {
  name: 'DocumentNumber';
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type EventResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['Event']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['EventCategory'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EventStatus'], ParentType, ContextType>;
  visibility?: Resolver<
    ResolversTypes['EventVisibility'],
    ParentType,
    ContextType
  >;
  initialDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  finalDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type EventDeletedTypeResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['EventDeletedType']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EventStatus'], ParentType, ContextType>;
  deletedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type FileResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['File']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimeType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['Mutation']
> = {
  updateAccount?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    MutationUpdateAccountArgs
  >;
  createEvent?: Resolver<
    ResolversTypes['Event'],
    ParentType,
    ContextType,
    MutationCreateEventArgs
  >;
  updateEvent?: Resolver<
    ResolversTypes['Event'],
    ParentType,
    ContextType,
    MutationUpdateEventArgs
  >;
  deleteEvent?: Resolver<
    ResolversTypes['EventDeletedType'],
    ParentType,
    ContextType,
    MutationDeleteEventArgs
  >;
  createTicket?: Resolver<
    ResolversTypes['Ticket'],
    ParentType,
    ContextType,
    MutationCreateTicketArgs
  >;
  updateTicket?: Resolver<
    ResolversTypes['Ticket'],
    ParentType,
    ContextType,
    MutationUpdateTicketArgs
  >;
  deleteTicket?: Resolver<
    ResolversTypes['TicketDeletedType'],
    ParentType,
    ContextType,
    MutationDeleteTicketArgs
  >;
  authenticate?: Resolver<
    ResolversTypes['AuthenticatePayload'],
    ParentType,
    ContextType,
    MutationAuthenticateArgs
  >;
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    MutationCreateUserArgs
  >;
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    MutationUpdateUserArgs
  >;
};

export interface ObjectIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export interface PhoneNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export type QueryResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['Query']
> = {
  accounts?: Resolver<
    Array<Maybe<ResolversTypes['Account']>>,
    ParentType,
    ContextType
  >;
  events?: Resolver<
    Maybe<Array<ResolversTypes['Event']>>,
    ParentType,
    ContextType
  >;
  event?: Resolver<
    Maybe<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    QueryEventArgs
  >;
  tickets?: Resolver<
    Maybe<Array<ResolversTypes['Ticket']>>,
    ParentType,
    ContextType,
    QueryTicketsArgs
  >;
  ticket?: Resolver<
    Maybe<ResolversTypes['Ticket']>,
    ParentType,
    ContextType,
    QueryTicketArgs
  >;
  currentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type TicketResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['Ticket']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  available?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lot?: Resolver<ResolversTypes['TicketLot'], ParentType, ContextType>;
  quantityPerPurchase?: Resolver<
    ResolversTypes['TicketQuantityPerPurchase'],
    ParentType,
    ContextType
  >;
  category?: Resolver<
    ResolversTypes['TicketCategory'],
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes['TicketStatus'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type TicketDeletedTypeResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['TicketDeletedType']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TicketStatus'], ParentType, ContextType>;
  deletedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type TicketLotResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['TicketLot']
> = {
  initial?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  end?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type TicketQuantityPerPurchaseResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['TicketQuantityPerPurchase']
> = {
  min?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  max?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export interface TimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UserStatus'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type Resolvers<ContextType = AppModuleContext> = {
  Account?: AccountResolvers<ContextType>;
  AuthenticatePayload?: AuthenticatePayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DocumentNumber?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Event?: EventResolvers<ContextType>;
  EventDeletedType?: EventDeletedTypeResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Ticket?: TicketResolvers<ContextType>;
  TicketDeletedType?: TicketDeletedTypeResolvers<ContextType>;
  TicketLot?: TicketLotResolvers<ContextType>;
  TicketQuantityPerPurchase?: TicketQuantityPerPurchaseResolvers<ContextType>;
  Time?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = AppModuleContext> = Resolvers<ContextType>;
