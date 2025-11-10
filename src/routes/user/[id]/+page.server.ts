import type { Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete('sessionid', { path: '/' });
    
    redirect(303, '/user/login');
  }
}satisfies Actions