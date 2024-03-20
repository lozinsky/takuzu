import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { ButtonLink } from '~/components/ui/button-link';
import { GameModal } from '~/components/ui/game-modal';
import { GameModalFooter } from '~/components/ui/game-modal-footer';
import { GameModalHeader } from '~/components/ui/game-modal-header';
import { useRandom } from '~/hooks/use-random';
import { type Messages } from '~/services/intl';
import { sample } from '~/shared/random';

const PRAISE_MESSAGE_IDS: ReadonlyArray<keyof Messages> = [
  'gamePraiseMessage0',
  'gamePraiseMessage1',
  'gamePraiseMessage2',
  'gamePraiseMessage3',
  'gamePraiseMessage4',
  'gamePraiseMessage5',
  'gamePraiseMessage6',
  'gamePraiseMessage7',
  'gamePraiseMessage8',
  'gamePraiseMessage9',
  'gamePraiseMessage10',
  'gamePraiseMessage11',
  'gamePraiseMessage12',
  'gamePraiseMessage13',
  'gamePraiseMessage14',
  'gamePraiseMessage15',
  'gamePraiseMessage16',
  'gamePraiseMessage17',
  'gamePraiseMessage18',
  'gamePraiseMessage19',
];

export function GamePraiseModal({ size }: { size?: number }) {
  const random = useRandom();
  const praiseMessageId = useMemo(() => sample(PRAISE_MESSAGE_IDS, random), [random]);

  return (
    <GameModal>
      <GameModalHeader>
        <FormattedMessage id={praiseMessageId} />
      </GameModalHeader>
      <GameModalFooter>
        {size !== undefined && (
          <ButtonLink prefetch='render' replace to={`/game/new/${size}`} variant='primary'>
            <FormattedMessage id='gameAgainLink' />
          </ButtonLink>
        )}
        <ButtonLink history={false} replace to='/' variant='secondary'>
          <FormattedMessage id='gameMenuLink' />
        </ButtonLink>
      </GameModalFooter>
    </GameModal>
  );
}
