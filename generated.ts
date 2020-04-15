import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
import { AppModuleContext } from "./app.module";
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
  JSON: { [key: string]: any };
  Date: Date;
  Time: string;
  ObjectId: string;
  PhoneNumber: string;
  DocumentNumber: string;
  URL: string;
};

export type Account = {
  __typename?: "Account";
  id: Scalars["ID"];
  admin: User;
  users: Array<User>;
  status?: Maybe<AccountStatus>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export enum AccountStatus {
  Active = "ACTIVE",
  Disabled = "DISABLED"
}

export type AuthenticateInput = {
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
};

export type AuthenticatePayload = {
  __typename?: "AuthenticatePayload";
  token: Scalars["String"];
  user: User;
};

export type CreateAccountInput = {
  admin: Scalars["ID"];
};

export type CreateUserInput = {
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
  name: Scalars["String"];
};

export enum Currency {
  Brl = "BRL"
}

export type File = {
  __typename?: "File";
  name: Scalars["String"];
  mimeType: Scalars["String"];
  url: Scalars["URL"];
};

export type Mutation = {
  __typename?: "Mutation";
  updateAccount: Account;
  authenticate: AuthenticatePayload;
  createUser: User;
  updateUser: User;
};

export type MutationUpdateAccountArgs = {
  id: Scalars["ID"];
  input: UpdateAccountInput;
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
  __typename?: "Query";
  currentAccount?: Maybe<Account>;
  currentUser: User;
};

export type UpdateAccountInput = {
  admin: Scalars["ID"];
  users?: Maybe<Array<Scalars["ID"]>>;
  status?: Maybe<AccountStatus>;
};

export type UpdateUserInput = {
  email?: Maybe<Scalars["EmailAddress"]>;
  password?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  status: UserStatus;
  name?: Maybe<Scalars["String"]>;
  email: Scalars["EmailAddress"];
  role: UserRole;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export enum UserRole {
  Admin = "ADMIN",
  Basic = "BASIC"
}

export enum UserStatus {
  Active = "ACTIVE",
  Disabled = "DISABLED"
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
  ID: ResolverTypeWrapper<Partial<Scalars["ID"]>>;
  User: ResolverTypeWrapper<Partial<User>>;
  UserStatus: ResolverTypeWrapper<Partial<UserStatus>>;
  String: ResolverTypeWrapper<Partial<Scalars["String"]>>;
  EmailAddress: ResolverTypeWrapper<Partial<Scalars["EmailAddress"]>>;
  UserRole: ResolverTypeWrapper<Partial<UserRole>>;
  DateTime: ResolverTypeWrapper<Partial<Scalars["DateTime"]>>;
  AccountStatus: ResolverTypeWrapper<Partial<AccountStatus>>;
  Mutation: ResolverTypeWrapper<{}>;
  UpdateAccountInput: ResolverTypeWrapper<Partial<UpdateAccountInput>>;
  AuthenticateInput: ResolverTypeWrapper<Partial<AuthenticateInput>>;
  AuthenticatePayload: ResolverTypeWrapper<Partial<AuthenticatePayload>>;
  CreateUserInput: ResolverTypeWrapper<Partial<CreateUserInput>>;
  UpdateUserInput: ResolverTypeWrapper<Partial<UpdateUserInput>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars["Boolean"]>>;
  CreateAccountInput: ResolverTypeWrapper<Partial<CreateAccountInput>>;
  JSON: ResolverTypeWrapper<Partial<Scalars["JSON"]>>;
  Date: ResolverTypeWrapper<Partial<Scalars["Date"]>>;
  Time: ResolverTypeWrapper<Partial<Scalars["Time"]>>;
  ObjectId: ResolverTypeWrapper<Partial<Scalars["ObjectId"]>>;
  PhoneNumber: ResolverTypeWrapper<Partial<Scalars["PhoneNumber"]>>;
  DocumentNumber: ResolverTypeWrapper<Partial<Scalars["DocumentNumber"]>>;
  URL: ResolverTypeWrapper<Partial<Scalars["URL"]>>;
  Currency: ResolverTypeWrapper<Partial<Currency>>;
  File: ResolverTypeWrapper<Partial<File>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Account: Partial<Account>;
  ID: Partial<Scalars["ID"]>;
  User: Partial<User>;
  UserStatus: Partial<UserStatus>;
  String: Partial<Scalars["String"]>;
  EmailAddress: Partial<Scalars["EmailAddress"]>;
  UserRole: Partial<UserRole>;
  DateTime: Partial<Scalars["DateTime"]>;
  AccountStatus: Partial<AccountStatus>;
  Mutation: {};
  UpdateAccountInput: Partial<UpdateAccountInput>;
  AuthenticateInput: Partial<AuthenticateInput>;
  AuthenticatePayload: Partial<AuthenticatePayload>;
  CreateUserInput: Partial<CreateUserInput>;
  UpdateUserInput: Partial<UpdateUserInput>;
  Boolean: Partial<Scalars["Boolean"]>;
  CreateAccountInput: Partial<CreateAccountInput>;
  JSON: Partial<Scalars["JSON"]>;
  Date: Partial<Scalars["Date"]>;
  Time: Partial<Scalars["Time"]>;
  ObjectId: Partial<Scalars["ObjectId"]>;
  PhoneNumber: Partial<Scalars["PhoneNumber"]>;
  DocumentNumber: Partial<Scalars["DocumentNumber"]>;
  URL: Partial<Scalars["URL"]>;
  Currency: Partial<Currency>;
  File: Partial<File>;
};

export type AccountResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes["Account"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  admin?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  status?: Resolver<
    Maybe<ResolversTypes["AccountStatus"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
};

export type AuthenticatePayloadResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes["AuthenticatePayload"]
> = {
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface DocumentNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DocumentNumber"], any> {
  name: "DocumentNumber";
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export type FileResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes["File"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  mimeType?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["URL"], ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export type MutationResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes["Mutation"]
> = {
  updateAccount?: Resolver<
    ResolversTypes["Account"],
    ParentType,
    ContextType,
    MutationUpdateAccountArgs
  >;
  authenticate?: Resolver<
    ResolversTypes["AuthenticatePayload"],
    ParentType,
    ContextType,
    MutationAuthenticateArgs
  >;
  createUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    MutationCreateUserArgs
  >;
  updateUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    MutationUpdateUserArgs
  >;
};

export interface ObjectIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ObjectId"], any> {
  name: "ObjectId";
}

export interface PhoneNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["PhoneNumber"], any> {
  name: "PhoneNumber";
}

export type QueryResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes["Query"]
> = {
  currentAccount?: Resolver<
    Maybe<ResolversTypes["Account"]>,
    ParentType,
    ContextType
  >;
  currentUser?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
};

export interface TimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Time"], any> {
  name: "Time";
}

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["URL"], any> {
  name: "URL";
}

export type UserResolvers<
  ContextType = AppModuleContext,
  ParentType = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["UserStatus"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes["EmailAddress"], ParentType, ContextType>;
  role?: Resolver<ResolversTypes["UserRole"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
};

export type Resolvers<ContextType = AppModuleContext> = {
  Account?: AccountResolvers<ContextType>;
  AuthenticatePayload?: AuthenticatePayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DocumentNumber?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Time?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = AppModuleContext> = Resolvers<ContextType>;
