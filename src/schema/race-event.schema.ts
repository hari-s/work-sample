import mongoose, { Document, Schema } from 'mongoose';

import { RaceEvent } from '../utils/types';

/**
 * Describes the interface of race-event model of mongoose
 */
export interface RaceEventDocument extends Document, RaceEvent {}

const raceEventSchema = new Schema<RaceEventDocument>(
  {
    event: String,
    horse: {
      id: Number,
      name: String,
    },
    time: Number,
  },
  {
    timestamps: true,
  }
);

/**
 * The mongoose representation of race event model
 */
export default mongoose.model<RaceEventDocument>(
  'race-events',
  raceEventSchema
);
