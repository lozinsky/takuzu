import { useLoaderData } from '@remix-run/react';
import { type LoaderFunctionArgs, json } from '@vercel/remix';
import { FormattedMessage } from 'react-intl';

import { BrandLogo } from '~/components/ui/brand-logo';
import { ButtonLink } from '~/components/ui/button-link';
import { Menu } from '~/components/ui/menu';
import { MenuGroup } from '~/components/ui/menu-group';
import { MenuItem } from '~/components/ui/menu-item';
import { getGame } from '~/services/game.server';
import { getSession } from '~/services/session.server';
import { getErrorResponse } from '~/shared/http';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const session = await getSession(request);
    const game = getGame(session);

    return json({
      board: game === null ? null : game.board.toString(),
    });
  } catch (error) {
    throw getErrorResponse(error);
  }
}

export default function Route() {
  const { board } = useLoaderData<typeof loader>();

  return (
    <Menu>
      <BrandLogo />
      <MenuGroup>
        {board !== null && (
          <MenuItem>
            <ButtonLink prefetch='render' to={`/game/${board}`} variant='primary'>
              <FormattedMessage id='menuGameContinueLink' />
            </ButtonLink>
          </MenuItem>
        )}
        <MenuItem>
          <ButtonLink prefetch='render' to='/game' variant={board === null ? 'primary' : 'secondary'}>
            <FormattedMessage id='menuGameLink' />
          </ButtonLink>
        </MenuItem>
        <MenuItem>
          <ButtonLink to='/game/tutorial' variant='secondary'>
            <FormattedMessage id='menuGameTutorialLink' />
          </ButtonLink>
        </MenuItem>
      </MenuGroup>
    </Menu>
  );
}
