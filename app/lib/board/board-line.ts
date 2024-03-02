import { DoubleMatrixRotation, type MatrixLine, type MatrixRotatable } from '~/lib/matrix';
import { expectToBeDefined } from '~/shared/expect';

import { BoardCell, BoardCellState, type BoardCellValue } from './board-cell';

export type BoardLineValue = readonly BoardCellValue[];

export class BoardLine implements Iterable<BoardCell>, MatrixLine<BoardCell>, MatrixRotatable<BoardLine> {
  readonly #cells: readonly BoardCell[];

  constructor(cells: readonly BoardCell[]) {
    this.#cells = cells;
  }

  static blank(size: number) {
    return new this(Array.from({ length: size }, () => BoardCell.create(BoardCellState.E)));
  }

  static create(states: readonly BoardCellState[]) {
    return new this(states.map((state) => BoardCell.create(state)));
  }

  static from(value: BoardLineValue) {
    return new this(value.map((value) => BoardCell.from(value)));
  }

  [Symbol.iterator]() {
    return this.#cells[Symbol.iterator]();
  }

  at(index: number) {
    return this.#cells.at(index);
  }

  entries() {
    return this.#cells.entries();
  }

  equals(other: BoardLine) {
    if (this.length !== other.length) {
      return false;
    }

    return this.#cells.every((cell, index) => cell.equals(expectToBeDefined(other.at(index))));
  }

  includes(other: BoardLine) {
    if (this.length !== other.length) {
      return false;
    }

    return this.#cells.every((a, index) => {
      const b = expectToBeDefined(other.at(index));

      return b.isEmpty ? true : a.equals(b);
    });
  }

  indexOf(cell: BoardCell) {
    return this.#cells.indexOf(cell);
  }

  keys() {
    return this.#cells.keys();
  }

  lengthOf(state: BoardCellState) {
    return this.#cells.reduce((length, cell) => (cell.state === state ? length + 1 : length), 0);
  }

  rotate() {
    return new BoardLine(this.#cells.toReversed());
  }

  slice(start: number, end?: number) {
    return this.#cells.slice(start, end);
  }

  toDoubleRotation() {
    return DoubleMatrixRotation.run<BoardLine>(this);
  }

  valueOf(): BoardLineValue {
    return this.#cells.map((cell) => cell.valueOf());
  }

  get balance() {
    return this.#cells.reduce((balance, cell) => balance + cell.balance, 0);
  }

  get isEmpty() {
    return this.#cells.every((cell) => cell.isEmpty);
  }

  get isFilled() {
    return this.#cells.every((cell) => cell.isFilled);
  }

  get length() {
    return this.#cells.length;
  }

  get progress() {
    return this.#cells.reduce((progress, cell) => (cell.isFilled ? progress + 1 : progress), 0) / this.length;
  }
}
