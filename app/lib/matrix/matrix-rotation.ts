function* run<T>(rotation: MatrixRotation<T>) {
  for (let index = 0; ; index++) {
    const target = rotation.rotate(index);

    if (target === null) {
      break;
    }

    yield target;
  }
}

export interface MatrixRotatable<T> {
  rotate(): T;
}

export interface MatrixReversible<T> {
  reverse(): T;
}

export interface MatrixRotation<T> {
  rotate(index: number): T | null;
}

export class DoubleMatrixRotation<T extends MatrixRotatable<T>> implements MatrixRotation<T> {
  readonly #target: T;

  constructor(target: T) {
    this.#target = target;
  }

  static run<T extends MatrixRotatable<T>>(target: T) {
    return run(new this(target));
  }

  rotate(index: number): T | null {
    switch (index) {
      case 0:
        return this.#target;

      case 1:
        return this.#target.rotate();

      default:
        return null;
    }
  }
}

export class QuadrupleMatrixRotation<T extends MatrixReversible<T> & MatrixRotatable<T>> implements MatrixRotation<T> {
  readonly #target: T;

  constructor(target: T) {
    this.#target = target;
  }

  static run<T extends MatrixReversible<T> & MatrixRotatable<T>>(target: T) {
    return run(new this(target));
  }

  rotate(index: number): T | null {
    switch (index) {
      case 0:
        return this.#target;

      case 1:
        return this.#target.reverse();

      case 2:
        return this.#target.rotate();

      case 3:
        return this.#target.rotate().reverse();

      default:
        return null;
    }
  }
}
