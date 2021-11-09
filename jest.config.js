// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

const config = {
  verbose: true,
  displayName: 'work-sample',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
};

module.exports = config;
