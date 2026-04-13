import { AuthResource } from '@lam/frontend';
import { authStore } from './authStore';

export function useAuthResourceHook(): AuthResource {
  const { logout, login } = authStore();

  return {
    login: login,
    logout: logout,
    register: login,
  };
}
