import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { type ActionFunctionArgs, type LoaderFunctionArgs, json, redirect } from '@vercel/remix';
import { type FormEvent } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '~/components/ui/button';
import { Menu } from '~/components/ui/menu';
import { MenuGroup } from '~/components/ui/menu-group';
import { MenuItem } from '~/components/ui/menu-item';
import { SettingsMenu } from '~/components/ui/settings-menu';
import { SettingsMenuGroup } from '~/components/ui/settings-menu-group';
import { SettingsMenuRadioItem } from '~/components/ui/settings-menu-radio-item';
import { APPEARANCES, isAppearance } from '~/services/appearance';
import { getAppearance, setAppearance } from '~/services/appearance.server';
import { LOCALES, isLocale } from '~/services/intl';
import { getLocale, setLocale } from '~/services/intl.server';
import { commitSession, getSession } from '~/services/session.server';
import { expectToSatisfy } from '~/shared/expect';
import { getErrorResponse } from '~/shared/http';

import { MESSAGE_ID_BY_APPEARANCE, MESSAGE_RAW_BY_LOCALE } from './constants';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const session = await getSession(request);
    const appearance = getAppearance(session);
    const locale = getLocale(session, request.headers);

    return json({ appearance, locale });
  } catch (error) {
    throw getErrorResponse(error);
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const [session, formData] = await Promise.all([getSession(request), request.formData()]);

    setAppearance(session, expectToSatisfy(formData.get('appearance'), isAppearance));
    setLocale(session, expectToSatisfy(formData.get('locale'), isLocale));

    return redirect(request.url, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    throw getErrorResponse(error);
  }
}

export default function Route() {
  const { appearance: selectedAppearance, locale: selectedLocale } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  function handleChange(event: FormEvent<HTMLFormElement>) {
    submit(event.currentTarget, { method: 'post', replace: true });
  }

  return (
    <Menu asChild>
      <Form method='post' onChange={handleChange}>
        <SettingsMenu>
          <SettingsMenuGroup legend={<FormattedMessage id='menuSettingsLanguageLegend' />}>
            {LOCALES.map((locale) => (
              <SettingsMenuRadioItem
                defaultChecked={locale === selectedLocale}
                key={locale}
                name='locale'
                value={locale}
              >
                {MESSAGE_RAW_BY_LOCALE[locale]}
              </SettingsMenuRadioItem>
            ))}
          </SettingsMenuGroup>
          <SettingsMenuGroup legend={<FormattedMessage id='menuSettingsAppearanceLegend' />}>
            {APPEARANCES.map((appearance) => (
              <SettingsMenuRadioItem
                defaultChecked={appearance === selectedAppearance}
                key={appearance}
                name='appearance'
                value={appearance}
              >
                <FormattedMessage id={MESSAGE_ID_BY_APPEARANCE[appearance]} />
              </SettingsMenuRadioItem>
            ))}
          </SettingsMenuGroup>
        </SettingsMenu>
        <MenuGroup scripting='none'>
          <MenuItem>
            <Button variant='primary'>
              <FormattedMessage id='menuSettingsSaveButton' />
            </Button>
          </MenuItem>
        </MenuGroup>
      </Form>
    </Menu>
  );
}
