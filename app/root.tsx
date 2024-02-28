import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { type LinkDescriptor, type LoaderFunctionArgs, type MetaArgs, type MetaDescriptor, json } from '@vercel/remix';
import { IntlProvider } from 'react-intl';

import '~/globals';

import { Layout } from '~/components/ui/layout';
import { LayoutContent } from '~/components/ui/layout-content';
import { LayoutHeader } from '~/components/ui/layout-header';
import { getAppearance } from '~/services/appearance.server';
import { type Messages } from '~/services/intl';
import { getIntl } from '~/services/intl.server';
import { getSession } from '~/services/session.server';
import { getErrorResponse } from '~/shared/http';

import root from './root.css?url';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const session = await getSession(request);
    const appearance = getAppearance(session);
    const intl = getIntl(session, request.headers);
    const title = intl.formatMessage({ id: 'metaTitle' });
    const description = intl.formatMessage({ id: 'metaDescription' });

    return json({
      appearance,
      intl: { locale: intl.locale, messages: intl.messages as Messages },
      meta: { description, title },
    });
  } catch (error) {
    throw getErrorResponse(error);
  }
}

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
  const { appearance, intl } = useLoaderData<typeof loader>();

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
          <Layout>
            <LayoutHeader />
            <LayoutContent>
              <Outlet />
            </LayoutContent>
          </Layout>
        </IntlProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
