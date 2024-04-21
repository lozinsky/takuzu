import { assert, expect, test } from 'vitest';

import { getErrorResponse } from './http';

class AssertionError extends Error {
  constructor(message?: string) {
    super(message);

    this.name = 'AssertionError';
  }
}

test('returns response', async () => {
  const candidate = getErrorResponse(new AssertionError('Message'));

  assert(candidate instanceof Response);

  expect({ message: await candidate.text(), status: candidate.status }).toMatchSnapshot();
});

test.each([new Error('Message'), 'Message', '', 0, null, undefined])('returns error', (value) => {
  expect(getErrorResponse(value)).toMatchSnapshot();
});
