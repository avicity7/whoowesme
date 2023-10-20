import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import {
 PRIVATE_GOOGLE_CLIENT_KEY,
 PRIVATE_GOOGLE_CLIENT_SECRET,
} from '$env/static/private';

export const handle = SvelteKitAuth({
 providers: [GoogleProvider({ clientId: PRIVATE_GOOGLE_CLIENT_KEY, clientSecret: PRIVATE_GOOGLE_CLIENT_SECRET })],
 pages: {
  signIn: '/profile',
  signOut: '/profile'
 }
});