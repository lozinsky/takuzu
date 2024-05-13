import {
  Links,
  Meta,
  type MetaArgs_SingleFetch as MetaArgs,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunctionArgs,
  useLoaderData,
} from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';
import { type LinkDescriptor, type MetaDescriptor, unstable_defineLoader as defineLoader } from '@vercel/remix';
import { IntlProvider } from 'react-intl';

import '~/globals';

import { RootLayout } from '~/components/ui/root-layout';
import { RootLayoutContent } from '~/components/ui/root-layout-content';
import { RootLayoutHeader } from '~/components/ui/root-layout-header';
import { RandomSeedContext } from '~/hooks/use-random';
import { getAppearance } from '~/services/appearance.server';
import { type Messages } from '~/services/intl';
import { getIntl } from '~/services/intl.server';
import { getSession } from '~/services/session.server';
import { getErrorResponse } from '~/shared/http';
import { Random } from '~/shared/random';

import root from './root.css?url';

export const config = {
  runtime: 'edge',
};

export function shouldRevalidate({ defaultShouldRevalidate, formAction }: ShouldRevalidateFunctionArgs) {
  if (formAction?.startsWith('/settings')) {
    return defaultShouldRevalidate;
  }

  return false;
}

export const loader = defineLoader(async ({ request }) => {
  try {
    const session = await getSession(request);
    const appearance = getAppearance(session);
    const intl = getIntl(session, request.headers);
    const title = intl.formatMessage({ id: 'metaTitle' });
    const description = intl.formatMessage({ id: 'metaDescription' });
    const random = Random.create();

    return {
      appearance,
      intl: { locale: intl.locale, messages: intl.messages as Messages },
      meta: { description, title },
      random: { seed: random.seed },
    };
  } catch (error) {
    throw getErrorResponse(error);
  }
});

export function meta({ data }: MetaArgs<typeof loader>): MetaDescriptor[] {
  if (data === undefined) {
    return [];
  }

  return [{ title: data.meta.title }, { content: data.meta.description, name: 'description' }];
}

export function links(): LinkDescriptor[] {
  return [
    { href: '/manifest.webmanifest', rel: 'manifest' },
    { href: '/favicon.ico', rel: 'icon', sizes: '64x64' },
    { href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' },
    { href: '/apple-touch-icon.png', rel: 'apple-touch-icon' },
    { href: root, rel: 'stylesheet' },
  ];
}

export default function Root() {
  const { appearance, intl, random } = useLoaderData<typeof loader>();

  return (
    <html data-appearance={appearance} lang={intl.locale}>
      <head>
        <meta charSet='utf-8' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <Meta />
        <Links />
      </head>
      <body className='h-dvh bg-base-100 text-base-content'>
        <IntlProvider locale={intl.locale} messages={intl.messages}>
          <RandomSeedContext.Provider value={random.seed}>
            <RootLayout>
              <RootLayoutHeader />
              <RootLayoutContent>
                <Outlet />
              </RootLayoutContent>
            </RootLayout>
          </RandomSeedContext.Provider>
        </IntlProvider>
        <ScrollRestoration />
        <Scripts />
        <Analytics debug={false} />
      </body>
    </html>
  );
}
