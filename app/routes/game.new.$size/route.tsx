import { unstable_defineLoader as defineLoader, redirect } from '@vercel/remix';

import { generateBoard } from '~/services/game';
import { expectNotToBeNaN } from '~/shared/expect';
import { getErrorResponse } from '~/shared/http';

export const loader = defineLoader(async ({ params, request }) => {
  try {
    const url = new URL(request.url);
    const board = await generateBoard(expectNotToBeNaN(Number(params.size)), { signal: request.signal });

    url.pathname = `/game/${board.toString()}`;

    return redirect(url.toString());
  } catch (error) {
    throw getErrorResponse(error);
  }
});
