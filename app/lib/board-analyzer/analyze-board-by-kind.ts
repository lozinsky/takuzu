import { type Board, type BoardOrientation } from '~/lib/board';
import {
  selectFilledImbalancedLine,
  selectLineThatCanBeEqualToAnother,
  selectLineThatIncludesAnother,
  selectLineThatIsEqualToOthers,
  selectMiddleCellBetweenTwoIdentical,
  selectNextCellAfterTwoIdentical,
  selectThreeOrMoreIdenticalSequentialCells,
  selectUnfilledBalancedLine,
} from '~/lib/board-selectors';
import { MatrixSelection, type MatrixSelectionPosition } from '~/lib/matrix';
import { type Random, shuffle } from '~/shared/random';

export enum BoardAnalyzerReviewKind {
  Correction,
  Suggestion,
}

export enum BoardAnalyzerReviewReason {
  LineCanBeEqualToAnother,
  LineIncludesAnother,
  LineIsEqualToOthers,
  LineIsFilledAndImbalanced,
  LineIsUnfilledAndBalanced,
  MiddleCellBetweenTwoIdentical,
  NextCellAfterTwoIdentical,
  ThreeOrMoreIdenticalSequentialCells,
}

export interface BoardAnalyzerReviewPayload {
  readonly orientation: BoardOrientation;
  readonly positions: readonly MatrixSelectionPosition[];
}

export interface BoardAnalyzerReview {
  readonly payload: BoardAnalyzerReviewPayload;
  readonly reason: BoardAnalyzerReviewReason;
}

const BOARD_ANALYZER_REVIEW_REASONS_BY_BOARD_ANALYZER_REVIEW_KIND: Readonly<
  Record<BoardAnalyzerReviewKind, readonly BoardAnalyzerReviewReason[]>
> = {
  [BoardAnalyzerReviewKind.Correction]: [
    BoardAnalyzerReviewReason.LineIsFilledAndImbalanced,
    BoardAnalyzerReviewReason.LineIsEqualToOthers,
    BoardAnalyzerReviewReason.ThreeOrMoreIdenticalSequentialCells,
  ],
  [BoardAnalyzerReviewKind.Suggestion]: [
    BoardAnalyzerReviewReason.LineIsUnfilledAndBalanced,
    BoardAnalyzerReviewReason.LineCanBeEqualToAnother,
    BoardAnalyzerReviewReason.LineIncludesAnother,
    BoardAnalyzerReviewReason.MiddleCellBetweenTwoIdentical,
    BoardAnalyzerReviewReason.NextCellAfterTwoIdentical,
  ],
};

const SELECT_BY_BOARD_ANALYZER_REVIEW_REASON: Readonly<
  Record<BoardAnalyzerReviewReason, (target: Board) => BoardAnalyzerReviewPayload | undefined>
> = {
  [BoardAnalyzerReviewReason.LineCanBeEqualToAnother](target) {
    const payload = selectLineThatCanBeEqualToAnother(target);

    if (payload === undefined) {
      return;
    }

    const cells = [...Array.from(payload.line), ...Array.from(payload.another)];

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  [BoardAnalyzerReviewReason.LineIncludesAnother](target) {
    const payload = selectLineThatIncludesAnother(target);

    if (payload === undefined) {
      return;
    }

    const cells = [...Array.from(payload.line), ...Array.from(payload.another)];

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  [BoardAnalyzerReviewReason.LineIsEqualToOthers](target) {
    const payload = selectLineThatIsEqualToOthers(target);

    if (payload === undefined) {
      return;
    }

    const cells = [...Array.from(payload.line), ...payload.others.flatMap((line) => Array.from(line))];

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  [BoardAnalyzerReviewReason.LineIsFilledAndImbalanced](target) {
    const payload = selectFilledImbalancedLine(target);

    if (payload === undefined) {
      return;
    }

    const cells = Array.from(payload.line);

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  [BoardAnalyzerReviewReason.LineIsUnfilledAndBalanced](target) {
    const payload = selectUnfilledBalancedLine(target);

    if (payload === undefined) {
      return;
    }

    const cells = Array.from(payload.line);

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  [BoardAnalyzerReviewReason.MiddleCellBetweenTwoIdentical](target) {
    const payload = selectMiddleCellBetweenTwoIdentical(target);

    if (payload === undefined) {
      return;
    }

    const cells = [payload.cell];

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  [BoardAnalyzerReviewReason.NextCellAfterTwoIdentical](target) {
    const payload = selectNextCellAfterTwoIdentical(target);

    if (payload === undefined) {
      return;
    }

    const cells = [payload.cell];

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },

  [BoardAnalyzerReviewReason.ThreeOrMoreIdenticalSequentialCells](target) {
    const payload = selectThreeOrMoreIdenticalSequentialCells(target);

    if (payload === undefined) {
      return;
    }

    const cells = payload.cells;

    return {
      orientation: payload.orientation,
      positions: MatrixSelection.collect(target, cells).valueOf(),
    };
  },
};

export function analyzeBoardByKind(
  kind: BoardAnalyzerReviewKind,
  target: Board,
  random: Random,
): BoardAnalyzerReview | undefined {
  const reasons = shuffle(BOARD_ANALYZER_REVIEW_REASONS_BY_BOARD_ANALYZER_REVIEW_KIND[kind], random);

  for (const reason of reasons) {
    const select = SELECT_BY_BOARD_ANALYZER_REVIEW_REASON[reason];
    const payload = select(target);

    if (payload === undefined) {
      continue;
    }

    return { payload, reason };
  }
}
