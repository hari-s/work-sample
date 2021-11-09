// .env config
import { config } from 'dotenv';
config();

import { connectToMongoDB } from './db/connect';
import trotRaceConnectionInitilizer from './trot-race';

const main = async () => {
  await connectToMongoDB();
  trotRaceConnectionInitilizer();
};

main().catch((err) => {
  console.error(err);
  shutdown();
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit();
  });

/**
 * Need this in docker container to properly exit since node doesn't handle SIGINT/SIGTERM
 * Quit on ctrl-c when running docker in terminal
 */
process.on('SIGINT', () => {
  console.info('Got SIGINT');
  shutdown();
});

/**
 * Quit properly on docker stop
 */
process.on('SIGTERM', () => {
  console.info('Got SIGTERM');
  shutdown();
});

/**
 * Shut down server
 */
const shutdown = (): void => {
  console.info('Shutting down gracefully');
  process.exit();
};
