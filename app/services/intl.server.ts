/* eslint-disable @typescript-eslint/no-namespace */

import { type IntlShape, createIntl, createIntlCache } from '@formatjs/intl';
import * as LocaleMatcher from '@formatjs/intl-localematcher';
import { type Session } from '@vercel/remix';
import { parseAcceptLanguage } from 'intl-parse-accept-language';

import en from '~/messages/en.json';
import ru from '~/messages/ru.json';
import { DEFAULT_LOCALE, LOCALES, Locale, type Messages } from '~/services/intl';
import { type SessionData } from '~/services/session';

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof Messages;
    }

    interface IntlConfig {
      locale: Locale;
    }
  }
}

const intlCache = createIntlCache();
const intlByLocale: Readonly<Record<Locale, IntlShape>> = {
  [Locale.En]: createIntl({ locale: Locale.En, messages: en }, intlCache),
  [Locale.Ru]: createIntl({ locale: Locale.Ru, messages: ru }, intlCache),
};

function getLocalesFromSession(session: Session<SessionData>) {
  const locale = session.get('locale');

  if (typeof locale === 'string') {
    return [locale];
  }
}

function getLocalesFromHeader(headers: Headers) {
  return parseAcceptLanguage(headers.get('Accept-Language'));
}

export function getLocale(session: Session<SessionData>, headers: Headers) {
  const locales = getLocalesFromSession(session) ?? getLocalesFromHeader(headers);

  return LocaleMatcher.match(locales, LOCALES, DEFAULT_LOCALE) as Locale;
}

export function setLocale(session: Session<SessionData>, locale: Locale) {
  session.set('locale', locale);
}

export function getIntl(session: Session<SessionData>, headers: Headers) {
  return intlByLocale[getLocale(session, headers)];
}
