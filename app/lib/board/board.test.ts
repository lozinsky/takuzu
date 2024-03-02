import { expect, test, vi } from 'vitest';

import { MatrixSelection } from '~/lib/matrix';

import { Board, BoardOrientation, type BoardValue } from './board';
import { type BoardCell, BoardCellKind, BoardCellState } from './board-cell';
import { BoardLine } from './board-line';

test.each([4, 6, 8, 10])('returns blank board', (size) => {
  expect(Board.blank(size)).toMatchSnapshot();
});

test.each([
  [
    [
      [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R],
      [BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.B],
    ],
  ],
  [
    [
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ],
  ],
])('returns board from states', (states) => {
  expect(Board.create(states)).toMatchSnapshot();
});

test.each([
  [
    [
      [
        [BoardCellKind.Regular, BoardCellState.B],
        [BoardCellKind.Regular, BoardCellState.R],
        [BoardCellKind.Regular, BoardCellState.B],
        [BoardCellKind.Regular, BoardCellState.R],
      ],
      [
        [BoardCellKind.Regular, BoardCellState.R],
        [BoardCellKind.Regular, BoardCellState.B],
        [BoardCellKind.Regular, BoardCellState.R],
        [BoardCellKind.Regular, BoardCellState.B],
      ],
      [
        [BoardCellKind.Regular, BoardCellState.R],
        [BoardCellKind.Regular, BoardCellState.B],
        [BoardCellKind.Regular, BoardCellState.B],
        [BoardCellKind.Regular, BoardCellState.R],
      ],
      [
        [BoardCellKind.Regular, BoardCellState.B],
        [BoardCellKind.Regular, BoardCellState.R],
        [BoardCellKind.Regular, BoardCellState.R],
        [BoardCellKind.Regular, BoardCellState.B],
      ],
    ] as BoardValue,
  ],
  [
    [
      [
        [BoardCellKind.Regular, BoardCellState.B],
        [BoardCellKind.Regular, BoardCellState.R],
        [BoardCellKind.Regular, BoardCellState.B],
      ],
      [
        [BoardCellKind.Regular, BoardCellState.R],
        [BoardCellKind.Regular, BoardCellState.B],
        [BoardCellKind.Regular, BoardCellState.R],
      ],
      [
        [BoardCellKind.Regular, BoardCellState.R],
        [BoardCellKind.Regular, BoardCellState.B],
        [BoardCellKind.Regular, BoardCellState.B],
      ],
    ] as BoardValue,
  ],
])('returns board from value of', (value) => {
  expect(Board.from(value)).toMatchSnapshot();
});

test.each([
  'W1tbMSwwXSxbMSwxXSxbMSwwXSxbMSwxXV0sW1sxLDFdLFsxLDBdLFsxLDFdLFsxLDBdXSxbWzEsMV0sWzEsMF0sWzEsMF0sWzEsMV1dLFtbMSwwXSxbMSwxXSxbMSwxXSxbMSwwXV1d',
  'W1tbMSwwXSxbMSwxXSxbMSwwXV0sW1sxLDFdLFsxLDBdLFsxLDFdXSxbWzEsMV0sWzEsMF0sWzEsMF1dXQ==',
])('returns board from string', (value) => {
  expect(Board.parse(value)).toMatchSnapshot();
});

test.each([
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R],
    [BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B],
  ]),
])('returns board iterator', (board) => {
  expect(Array.from(board)).toMatchSnapshot();
});

test.each([
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    -1,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    0,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    1,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    2,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    3,
  ],
])('returns board line at index', (board, index) => {
  expect(board.at(index)).toMatchSnapshot();
});

test.each([
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R],
    [BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B],
  ]),
])('returns board entries', (board) => {
  expect(Array.from(board.entries())).toMatchSnapshot();
});

test.each([
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    -1,
    vi.fn(() => BoardLine.blank(3)),
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    0,
    vi.fn(() => BoardLine.blank(3)),
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    1,
    vi.fn(() => BoardLine.blank(3)),
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    2,
    vi.fn(() => BoardLine.blank(3)),
  ],
])('replaces board line at index in board', (board, index, callback) => {
  expect(board.replace(index, callback)).toMatchSnapshot();
  expect(callback).toBeCalledWith(board.at(index));
});

test.each([
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    new MatrixSelection([{ x: -1, y: -1 }]),
    vi.fn((cell: BoardCell) => cell.next()),
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    new MatrixSelection([{ x: 0, y: 0 }]),
    vi.fn((cell: BoardCell) => cell.next()),
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    new MatrixSelection([{ x: 1, y: 1 }]),
    vi.fn((cell: BoardCell) => cell.next()),
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    new MatrixSelection([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: -1 },
      { x: -1, y: -1 },
      { x: -1, y: -1 },
    ]),
    vi.fn((cell: BoardCell) => cell.next()),
  ],
])('replaces board cell at selection in board', (board, selection, callback) => {
  expect(board.replaceBy(selection, callback)).toMatchSnapshot();
});

test.each([
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R],
    [BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B],
  ]),
])('reverses board', (board) => {
  expect(board.reverse()).toMatchSnapshot();
  expect(board.reverse().orientation).toMatchSnapshot();
});

test.each([
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R],
    [BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B],
  ]),
  Board.create([]),
])('rotates board', (board) => {
  expect(board.rotate()).toMatchSnapshot();
  expect(board.rotate().orientation).toMatchSnapshot();
});

test.each([
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    -1,
    undefined,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    0,
    undefined,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    1,
    undefined,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    2,
    undefined,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    3,
    undefined,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    0,
    -1,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    0,
    0,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    0,
    1,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    0,
    2,
  ],
  [
    Board.create([
      [BoardCellState.B, BoardCellState.R, BoardCellState.B],
      [BoardCellState.R, BoardCellState.B, BoardCellState.R],
      [BoardCellState.R, BoardCellState.B, BoardCellState.B],
    ]),
    0,
    3,
  ],
])('slices board', (board, start, end) => {
  expect(board.slice(start, end)).toMatchSnapshot();
});

test.each([
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R],
    [BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B],
  ]),
])('returns board string', (board) => {
  expect(board.toString()).toMatchSnapshot();
});

test.each([
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R],
    [BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B],
  ]),
])('returns board value of', (board) => {
  expect(board.valueOf()).toMatchSnapshot();
});

test.each([
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R],
    [BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B],
  ]),
])('returns board length', (board) => {
  expect(board.length).toMatchSnapshot();
});

test.each([new Board(BoardOrientation.Portrait, []), new Board(BoardOrientation.Landscape, [])])(
  'returns board orientation',
  (board) => {
    expect(board.orientation).toMatchSnapshot();
  },
);

test.each([
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.B, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.R, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.R, BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R],
    [BoardCellState.B, BoardCellState.R, BoardCellState.R, BoardCellState.B],
  ]),
])('returns board progress', (board) => {
  expect(board.progress).toMatchSnapshot();
});
