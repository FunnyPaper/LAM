import { UserResource } from '@lam/frontend';
import { userStore } from './userStore';

export function useUserResourceHook(): UserResource {
  const { update: updateUser, me } = userStore();
  return {
    me: me,
    update: updateUser,
  };
}
