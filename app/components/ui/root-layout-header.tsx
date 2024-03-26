import { useLocation, useResolvedPath } from '@remix-run/react';
import { ChevronLeft, Code, Settings2 } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import { AriaLabel } from '~/components/base/aria-label';
import { AriaLabelled } from '~/components/base/aria-labelled';
import { Button } from '~/components/ui/button';
import { ButtonLink } from '~/components/ui/button-link';
import { useReferrerPath } from '~/hooks/use-referrer-path';

export function RootLayoutHeader() {
  const location = useLocation();
  const referrerPath = useReferrerPath();
  const parentPath = useResolvedPath('..', { relative: 'path' });

  return (
    <header className='flex h-14 justify-between'>
      <div className='flex items-center'>
        {location.pathname === parentPath.pathname ? (
          <AriaLabelled>
            <Button asChild size='icon' variant='ghost'>
              <a href='https://github.com/lozinsky/binairo' rel='noreferrer' target='_blank'>
                <Code aria-hidden />
                <AriaLabel>
                  <FormattedMessage id='headerSourceCodeLabel' />
                </AriaLabel>
              </a>
            </Button>
          </AriaLabelled>
        ) : (
          <AriaLabelled>
            <ButtonLink history={false} replace size='icon' to={referrerPath ?? parentPath} variant='ghost'>
              <ChevronLeft aria-hidden />
              <AriaLabel>
                <FormattedMessage id='headerBackLabel' />
              </AriaLabel>
            </ButtonLink>
          </AriaLabelled>
        )}
      </div>
      <div className='flex items-center justify-end'>
        {location.pathname !== '/settings' && (
          <AriaLabelled>
            <ButtonLink size='icon' to='/settings' variant='ghost'>
              <Settings2 aria-hidden />
              <AriaLabel>
                <FormattedMessage id='headerSettingsLabel' />
              </AriaLabel>
            </ButtonLink>
          </AriaLabelled>
        )}
      </div>
    </header>
  );
}
