import { createContext, useContext, useMemo } from 'react';

import { Random } from '~/shared/random';

export const RandomSeedContext = createContext(0);

export function useRandom() {
  const seed = useContext(RandomSeedContext);
  const random = useMemo(() => new Random(seed), [seed]);

  return random;
}
