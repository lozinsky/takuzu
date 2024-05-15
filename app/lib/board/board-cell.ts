export enum BoardCellKind {
  Fixed,
  Regular,
}

export enum BoardCellState {
  B = 0,
  E = 2,
  R = 1,
}

const NEXT_BOARD_CELL_STATE_BY_PREV_BOARD_CELL_STATE: Readonly<Record<BoardCellState, BoardCellState>> = {
  [BoardCellState.B]: BoardCellState.E,
  [BoardCellState.E]: BoardCellState.R,
  [BoardCellState.R]: BoardCellState.B,
};

const BALANCE_BY_BOARD_CELL_STATE: Readonly<Record<BoardCellState, number>> = {
  [BoardCellState.B]: -1,
  [BoardCellState.E]: 0,
  [BoardCellState.R]: 1,
};

export type BoardCellValue = readonly [kind: BoardCellKind, state: BoardCellState];

export class BoardCell {
  readonly #kind: BoardCellKind;
  readonly #state: BoardCellState;

  constructor(kind: BoardCellKind, state: BoardCellState) {
    this.#kind = kind;
    this.#state = state;
  }

  static create(state: BoardCellState) {
    return new this(BoardCellKind.Regular, state);
  }

  static from(value: BoardCellValue) {
    return new this(value[0], value[1]);
  }

  equals(other: BoardCell) {
    return this.#state === other.#state;
  }

  next() {
    return this.isFixed ? this : new BoardCell(this.#kind, NEXT_BOARD_CELL_STATE_BY_PREV_BOARD_CELL_STATE[this.#state]);
  }

  toFixed() {
    return new BoardCell(BoardCellKind.Fixed, this.#state);
  }

  valueOf(): BoardCellValue {
    return [this.#kind, this.#state];
  }

  get balance() {
    return BALANCE_BY_BOARD_CELL_STATE[this.#state];
  }

  get isEmpty() {
    return this.#state === BoardCellState.E;
  }

  get isFilled() {
    return !this.isEmpty;
  }

  get isFixed() {
    return this.#kind === BoardCellKind.Fixed;
  }

  get state() {
    return this.#state;
  }
}
