import { type BoardLine } from '~/lib/board';
import { expectToBeDefined } from '~/shared/expect';

export function selectNextCellAfterTwoIdentical(target: BoardLine) {
  for (const line of target.toDoubleRotation()) {
    for (const [start, head] of line.entries()) {
      if (head.isFilled) {
        const tail = line.slice(start + 1);

        if (tail.length >= 2) {
          const middle = expectToBeDefined(tail[0]);
          const next = expectToBeDefined(tail[1]);

          if (head.equals(middle) && next.isEmpty) {
            return { cell: next };
          }
        }
      }
    }
  }
}
