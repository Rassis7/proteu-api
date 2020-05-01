import { ForbiddenError } from 'apollo-server-core';
import { UserRole, UserStatus } from '../../../generated';
import { AppModuleContext } from '../../../app.module';
import { ResolversComposition } from 'graphql-toolkit';

export function isAuthenticated(): ResolversComposition {
  return (next) => async (root, args, context: AppModuleContext, info) => {
    const { currentUser: user } = context;

    if (!user) {
      throw new ForbiddenError(
        'You need to be authenticated to access this resource. Please, verify if authentication token is valid and it was passed correctly.'
      );
    }

    if (user.status !== UserStatus.Active) {
      throw new ForbiddenError('User is not active.');
    }

    return next(root, args, context, info);
  };
}

export function hasRole(role: UserRole): ResolversComposition {
  return (next) => async (root, args, context: AppModuleContext, info) => {
    const { currentUser: user } = context;

    if (user && user.role !== role) {
      throw new ForbiddenError(
        'You do not have permission to access this resource.'
      );
    }

    return next(root, args, context, info);
  };
}

export function hasAnyOfRoles(...roles: UserRole[]): ResolversComposition {
  return (next) => async (root, args, context: AppModuleContext, info) => {
    const { currentUser: user } = context;

    if (user && !roles.includes(user.role)) {
      throw new ForbiddenError(
        'You do not have permission to access this resource.'
      );
    }

    return next(root, args, context, info);
  };
}
