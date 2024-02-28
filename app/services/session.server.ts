import { type Session, createCookieSessionStorage } from '@vercel/remix';

import { type SessionData } from '~/services/session';

function getSessionStorage() {
  return createCookieSessionStorage<SessionData>({
    cookie: {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: [process.env.SESSION_SECRET],
      secure: import.meta.env.PROD,
    },
  });
}

export function getSession(request: Request) {
  return getSessionStorage().getSession(request.headers.get('Cookie'));
}

export function commitSession(session: Session<SessionData>) {
  return getSessionStorage().commitSession(session);
}
