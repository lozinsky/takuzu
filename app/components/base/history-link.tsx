import { Link } from '@remix-run/react';
import { type ComponentProps } from 'react';

import { usePushedReferrerResolvedPath } from '~/hooks/use-pushed-referrer-resolved-path';
import { useReplacedReferrerResolvedPath } from '~/hooks/use-replaced-referrer-resolved-path';

function HistoryPushLink({ relative, to, ...props }: ComponentProps<typeof Link>) {
  const pushedReferrerResolvedPath = usePushedReferrerResolvedPath(to, { relative });

  return <Link {...props} to={pushedReferrerResolvedPath} />;
}

function HistoryReplaceLink({ relative, to, ...props }: ComponentProps<typeof Link>) {
  const replacedReferrerResolvedPath = useReplacedReferrerResolvedPath(to, { relative });

  return <Link {...props} replace to={replacedReferrerResolvedPath} />;
}

export function HistoryLink({ replace, ...props }: ComponentProps<typeof Link>) {
  return replace ? <HistoryReplaceLink {...props} /> : <HistoryPushLink {...props} />;
}
