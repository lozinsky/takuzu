import { useMemo } from 'react';

import { GameBoard } from '~/components/ui/game-board';
import { GameBoardCell } from '~/components/ui/game-board-cell';
import { useRandom } from '~/hooks/use-random';
import { BoardCellState } from '~/lib/board';
import { shuffle } from '~/shared/random';

export function BrandLogo() {
  const random = useRandom();
  const states = useMemo(
    () => shuffle([BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.E], random),
    [random],
  );

  return (
    <div className='mx-auto flex w-2/3 justify-center'>
      <GameBoard size={states.length / 2}>
        {states.map((state, index) => (
          <GameBoardCell key={index} state={state} />
        ))}
      </GameBoard>
    </div>
  );
}
