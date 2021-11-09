import assert from 'assert';

// Assert required environment variables
assert(
  process.env.SIMULATOR_BASE_URL != null,
  'Environment variable SIMULATOR_BASE_URL should be defined'
);
assert(
  process.env.SIMULATOR_EMAIL != null,
  'Environment variable SIMULATOR_EMAIL should be defined'
);
assert(
  process.env.SIMULATOR_PASSWORD != null,
  'Environment variable SIMULATOR_PASSWORD should be defined'
);
assert(
  process.env.TROT_RACE_MONGODB_URI != null,
  'Environment variable TROT_RACE_MONGODB_URI should be defined'
);

export interface Environment {
  simulatorBaseUrl: string;
  simulatorEmail: string;
  simulatorPassword: string;
  trotRaceMongoDBUri: string;
}

export const environment = <Environment>{
  simulatorBaseUrl: process.env.SIMULATOR_BASE_URL,
  simulatorEmail: process.env.SIMULATOR_EMAIL,
  simulatorPassword: process.env.SIMULATOR_PASSWORD,
  trotRaceMongoDBUri: process.env.TROT_RACE_MONGODB_URI,
};
