import { type LoaderFunctionArgs, redirect } from '@vercel/remix';

import { generateBoard } from '~/services/game';
import { expectNotToBeNaN } from '~/shared/expect';
import { getErrorResponse } from '~/shared/http';

export async function loader({ params, request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const board = await generateBoard(expectNotToBeNaN(Number(params.size)), {
      /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
      // @ts-expect-error https://github.com/DefinitelyTyped/DefinitelyTyped/issues/60868
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(5000)]),
      /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
    });

    url.pathname = `/game/${board.toString()}`;

    return redirect(url.toString());
  } catch (error) {
    throw getErrorResponse(error);
  }
}
