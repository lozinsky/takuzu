import { type AppLoadContext, type Session, createCookieSessionStorage } from '@vercel/remix';

import { type SessionData } from '~/services/session';

function getSessionSecret(context: AppLoadContext) {
  return context.env?.SESSION_SECRET ?? process.env.SESSION_SECRET;
}

function getSessionStorage(context: AppLoadContext) {
  return createCookieSessionStorage<SessionData>({
    cookie: {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: [getSessionSecret(context)],
      secure: import.meta.env.PROD,
    },
  });
}

export function getSession(context: AppLoadContext, request: Request) {
  return getSessionStorage(context).getSession(request.headers.get('Cookie'));
}

export function commitSession(context: AppLoadContext, session: Session<SessionData>) {
  return getSessionStorage(context).commitSession(session);
}
