import { useLoaderData } from '@remix-run/react';
import { type LoaderFunctionArgs, json } from '@vercel/remix';
import { FormattedMessage } from 'react-intl';

import { BrandLogo } from '~/components/ui/brand-logo';
import { ButtonLink } from '~/components/ui/button-link';
import { Menu } from '~/components/ui/menu';
import { MenuGroup } from '~/components/ui/menu-group';
import { MenuItem } from '~/components/ui/menu-item';
import { BoardCellState } from '~/lib/board';
import { getGame } from '~/services/game.server';
import { getSession } from '~/services/session.server';
import { getErrorResponse } from '~/shared/http';
import { Random, shuffle } from '~/shared/random';

export async function loader({ context, request }: LoaderFunctionArgs) {
  try {
    const session = await getSession(context, request);
    const game = getGame(session);
    const random = Random.create();

    return json({
      board: game === null ? null : game.board.toString(),
      seed: random.seed,
    });
  } catch (error) {
    throw getErrorResponse(error);
  }
}

export default function Route() {
  const { board, seed } = useLoaderData<typeof loader>();
  const states = shuffle([BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.E], new Random(seed));

  return (
    <Menu>
      <BrandLogo states={states} />
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
