import { type Board } from '~/lib/board';

export function selectLineThatIsEqualToOthers(target: Board) {
  for (const board of target.toDoubleRotation()) {
    for (const [start, head] of board.entries()) {
      if (head.isFilled) {
        const others = board.slice(start + 1).filter((line) => head.equals(line));

        if (others.length > 0) {
          return { line: head, orientation: board.orientation, others };
        }
      }
    }
  }
}
