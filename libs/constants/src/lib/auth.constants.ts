export enum Role {
  ADMIN = 0,
  USER = 1,
}

export enum Permission {
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',

  POST_CREATE = 'post:create',
  POST_READ = 'post:read',
  POST_UPDATE = 'post:update',
  POST_DELETE = 'post:delete',
}

export const ROLE_PERMISSIONS = {
  [Role.ADMIN]: Object.values(Permission),
  [Role.USER]: [Permission.USER_READ, Permission.POST_READ],
};
