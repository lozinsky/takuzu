import { FormattedMessage } from 'react-intl';

import { GamePraiseModal } from '~/components/game-praise-modal';
import { Game } from '~/components/ui/game';
import { GameBoard } from '~/components/ui/game-board';
import { GameTip } from '~/components/ui/game-tip';
import { MatrixSelection } from '~/lib/matrix';

import { GameBoardContent } from './components';
import { BOARD, DEFAULT_STEP, STEPS } from './constants';
import { useParsedParams } from './hooks';

export default function Route() {
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
      {params.step === STEPS.length && <GamePraiseModal />}
    </Game>
  );
}
