import { Horse } from './horse';

export enum RaceEventState {
  Start = 'start',
  Finish = 'finish',
}

export interface RaceEvent {
  event: RaceEventState;
  horse: Horse;
  time: number;
}

export type RaceEventSchema = RaceEvent;

export type RaceEventResponse = RaceEvent;
