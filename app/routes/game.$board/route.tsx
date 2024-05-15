import { unstable_defineClientLoader as defineClientLoader, useLocation, useParams } from '@remix-run/react';
import { unstable_defineLoader as defineLoader } from '@vercel/remix';

import { GamePraiseModal } from '~/components/game-praise-modal';
import { Game } from '~/components/ui/game';
import { GameActions } from '~/components/ui/game-actions';
import { GameBoard } from '~/components/ui/game-board';
import { GameTip } from '~/components/ui/game-tip';
import { useRandom } from '~/hooks/use-random';
import { analyzeBoard, isBoardSolved, parseBoard } from '~/services/game';
import { setGame } from '~/services/game.server';
import { commitSession, getSession } from '~/services/session.server';
import { expectToBeDefined } from '~/shared/expect';
import { getErrorResponse } from '~/shared/http';

import { GameActionsContent, GameBoardContent, GameTipContent } from './components';

export const loader = defineLoader(async ({ params, request, response }) => {
  try {
    const session = await getSession(request);

    setGame(session, { board: parseBoard(expectToBeDefined(params.board)) });

    response.headers.set('Set-Cookie', await commitSession(session));

    return null;
  } catch (error) {
    throw getErrorResponse(error);
  }
});

export const clientLoader = defineClientLoader(({ serverLoader }) => {
  void serverLoader<typeof loader>();

  return null;
});

export default function Route() {
  const params = useParams();
  const location = useLocation();
  const random = useRandom();
  const searchParams = new URLSearchParams(location.search);
  const board = parseBoard(expectToBeDefined(params.board));
  const boardSize = board.length;
  const boardSolved = isBoardSolved(board);
  const boardAnalyzerReview = searchParams.has('analyze') ? analyzeBoard(board, random) : undefined;
  const boardAnalyzerReviewPayloadPositions = boardAnalyzerReview?.payload.positions ?? [];

  return (
    <Game>
      <GameTip>
        <GameTipContent boardAnalyzerReview={boardAnalyzerReview} progress={board.progress} />
      </GameTip>
      <GameBoard size={boardSize}>
        <GameBoardContent board={board} boardAnalyzerReviewPayloadPositions={boardAnalyzerReviewPayloadPositions} />
      </GameBoard>
      <GameActions>
        <GameActionsContent />
      </GameActions>
      {boardSolved && <GamePraiseModal size={boardSize} />}
    </Game>
  );
}
