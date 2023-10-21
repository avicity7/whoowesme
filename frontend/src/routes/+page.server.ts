import { redirect } from '@sveltejs/kit';
import { PUBLIC_BACKEND_URL } from '$env/static/public'

export const load = async (event) => {
  const session = await event.locals.getSession();

  if (!session) {
    throw redirect(307, 'auth/signin');
  }

  const url = PUBLIC_BACKEND_URL as RequestInfo

  return {
    url,
    session
  }
};