export function getErrorResponse(error: unknown): unknown {
  if (error instanceof Error && error.name === 'AssertionError') {
    return new Response(null, { status: 400, statusText: error.message });
  }

  return error;
}
