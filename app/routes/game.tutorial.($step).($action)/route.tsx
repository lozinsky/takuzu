import { useLoaderData } from '@remix-run/react';
import { json } from '@vercel/remix';
import { FormattedMessage } from 'react-intl';

import { GamePraiseModal } from '~/components/game-praise-modal';
import { Game } from '~/components/ui/game';
import { GameBoard } from '~/components/ui/game-board';
import { GameTip } from '~/components/ui/game-tip';
import { MatrixSelection } from '~/lib/matrix';
import { getErrorResponse } from '~/shared/http';
import { Random } from '~/shared/random';

import { GameBoardContent } from './components';
import { BOARD, DEFAULT_STEP, STEPS } from './constants';
import { useParsedParams } from './hooks';

export function loader() {
  try {
    const random = Random.create();

    return json({ seed: random.seed });
  } catch (error) {
    throw getErrorResponse(error);
  }
}

export function clientLoader() {
  const random = Random.create();

  return { seed: random.seed };
}

export default function Route() {
  const { seed } = useLoaderData<typeof loader>();
  const params = useParsedParams();
  const path = STEPS.slice(0, params.step);
  const step = STEPS[params.step] ?? DEFAULT_STEP;
  const action = step.action.exclude(params.action);
  const board = BOARD.replaceBy(
    MatrixSelection.concat(...path.map((step) => step.action), step.action.exclude(action)),
    (cell) => cell.next(),
  );

  return (
    <Game>
      <GameTip>{step.message !== null && <FormattedMessage id={step.message} />}</GameTip>
      <GameBoard size={board.length}>
        <GameBoardContent action={action} board={board} highlight={step.highlight} index={params.step} />
      </GameBoard>
      {params.step === STEPS.length && <GamePraiseModal seed={seed} />}
    </Game>
  );
}
