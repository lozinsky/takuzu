import { type Board, BoardCellState } from '~/lib/board';

export function selectLineThatIncludesAnother(target: Board) {
  for (const board of target.toQuadrupleRotation()) {
    for (const [start, head] of board.entries()) {
      if (head.isFilled) {
        for (const line of board.slice(start + 1)) {
          if (!line.isEmpty && line.lengthOf(BoardCellState.E) === 2 && line.balance === 0 && head.includes(line)) {
            return { another: line, line: head, orientation: board.orientation };
          }
        }
      }
    }
  }
}
