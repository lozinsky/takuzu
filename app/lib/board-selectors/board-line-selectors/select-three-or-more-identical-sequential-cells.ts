import { type BoardLine } from '~/lib/board';

export function selectThreeOrMoreIdenticalSequentialCells(target: BoardLine) {
  for (const [start, head] of target.entries()) {
    if (head.isFilled) {
      const cells = [head];

      for (const cell of target.slice(start + 1)) {
        if (!head.equals(cell)) {
          break;
        }

        cells.push(cell);
      }

      if (cells.length >= 3) {
        return { cells };
      }
    }
  }
}
