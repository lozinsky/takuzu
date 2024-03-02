import { assert, expect, test } from 'vitest';

import { BoardCellKind, BoardCellState } from './board-cell';
import { BoardLine, type BoardLineValue } from './board-line';

test.each([4, 6, 8, 10])('returns blank board line', (size) => {
  expect(BoardLine.blank(size)).toMatchSnapshot();
});

test.each([
  [[BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]],
  [[BoardCellState.B, BoardCellState.R, BoardCellState.E]],
])('returns board from states', (states) => {
  expect(BoardLine.create(states)).toMatchSnapshot();
});

test.each([
  [
    [
      [BoardCellKind.Regular, BoardCellState.B],
      [BoardCellKind.Regular, BoardCellState.B],
      [BoardCellKind.Regular, BoardCellState.R],
      [BoardCellKind.Regular, BoardCellState.E],
    ] as BoardLineValue,
  ],
  [
    [
      [BoardCellKind.Regular, BoardCellState.B],
      [BoardCellKind.Regular, BoardCellState.R],
      [BoardCellKind.Regular, BoardCellState.E],
    ] as BoardLineValue,
  ],
])('returns board from value of', (value) => {
  expect(BoardLine.from(value)).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
])('returns board line iterator', (line) => {
  expect(Array.from(line)).toMatchSnapshot();
});

test.each([
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), -1],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 0],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 1],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 2],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 3],
])('returns board cell at index', (line, index) => {
  expect(line.at(index)).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
])('returns board line entries', (line) => {
  expect(Array.from(line.entries())).toMatchSnapshot();
});

test.each([
  [
    BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
    BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  ],
  [
    BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
    BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  ],
])('returns "true" if one board line is equal to other', (line, other) => {
  expect(line.equals(other)).toMatchSnapshot();
});

test.each([
  [
    BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.E, BoardCellState.E]),
    BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  ],
  [
    BoardLine.create([BoardCellState.B, BoardCellState.E, BoardCellState.E]),
    BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  ],
])('returns "false" if one board line is not equal to other', (line, other) => {
  expect(line.equals(other)).toMatchSnapshot();
});

test.each([
  [
    BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
    BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.E, BoardCellState.E]),
  ],
  [
    BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
    BoardLine.create([BoardCellState.B, BoardCellState.E, BoardCellState.E]),
  ],
])('returns "true" if one board line is include other', (line, other) => {
  expect(line.includes(other)).toMatchSnapshot();
});

test.each([
  [
    BoardLine.create([BoardCellState.E, BoardCellState.R, BoardCellState.B, BoardCellState.B]),
    BoardLine.create([BoardCellState.R, BoardCellState.E, BoardCellState.B, BoardCellState.B]),
  ],
  [
    BoardLine.create([BoardCellState.E, BoardCellState.R, BoardCellState.R, BoardCellState.B]),
    BoardLine.create([BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.B]),
  ],
  [
    BoardLine.create([BoardCellState.E, BoardCellState.R, BoardCellState.R, BoardCellState.B]),
    BoardLine.create([BoardCellState.E, BoardCellState.E, BoardCellState.B]),
  ],
])('returns "false" if one board line is not include other', (line, other) => {
  expect(line.includes(other)).toMatchSnapshot();
});

test.each([
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), -1],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 0],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 1],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 2],
])('returns board cell index of', (line, index) => {
  const cell = line.at(index);

  assert(cell !== undefined);

  expect(line.indexOf(cell)).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
])('returns board line keys', (line) => {
  expect(Array.from(line.keys())).toMatchSnapshot();
});

test.each([
  [BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]), BoardCellState.E],
  [BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]), BoardCellState.R],
  [BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]), BoardCellState.B],
])('returns length of board state in board line', (line, state) => {
  expect(line.lengthOf(state)).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
])('rotates board line', (line) => {
  expect(line.rotate()).toMatchSnapshot();
});

test.each([
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), -1, undefined],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 0, undefined],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 1, undefined],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 2, undefined],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 3, undefined],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 0, -1],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 0, 0],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 0, 1],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 0, 2],
  [BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]), 0, 3],
])('slices board line', (line, start, end) => {
  expect(line.slice(start, end)).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
])('returns board line value of', (line) => {
  expect(line.valueOf()).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E]),
  BoardLine.create([BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B]),
  BoardLine.create([BoardCellState.R, BoardCellState.R, BoardCellState.R, BoardCellState.B]),
  BoardLine.create([BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.B]),
])('returns board line balance', (line) => {
  expect(line.balance).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E]),
  BoardLine.create([BoardCellState.E, BoardCellState.E, BoardCellState.E]),
])('returns "true" if board line is empty', (line) => {
  expect(line.isEmpty).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
])('returns "false" if board line is not empty', (line) => {
  expect(line.isEmpty).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.R]),
  BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.R]),
])('returns "true" if board line is filled', (line) => {
  expect(line.isFilled).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
])('returns "false" if board line is not filled', (line) => {
  expect(line.isFilled).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.E]),
  BoardLine.create([BoardCellState.B, BoardCellState.R, BoardCellState.E]),
])('returns board line length', (line) => {
  expect(line.length).toMatchSnapshot();
});

test.each([
  BoardLine.create([BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E]),
  BoardLine.create([BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.B]),
  BoardLine.create([BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B]),
])('returns board line progress', (line) => {
  expect(line.progress).toMatchSnapshot();
});
