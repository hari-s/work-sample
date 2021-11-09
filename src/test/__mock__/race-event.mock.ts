import { RaceEvent, RaceEventState } from '../../utils';

export const MOCK_EVENT: RaceEvent = {
  event: RaceEventState.Finish,
  horse: {
    id: 15,
    name: 'Nilly',
  },
  time: 11381,
};
