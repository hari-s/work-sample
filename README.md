# :racehorse: Trot Race Work Sample Project

This repo contains source code of work sample.

:raised_hand: Please rename .env.sample to .env and add appropriate environment variables value

## :fish: Docker configuration

Below commpands build images specified in docker-compose.yml file

```
docker-compose build
```

Below commands builds the image if they are not located locally and starts the containers. if images are already build, it will run the container directly without build.

```
docker-compose up
```

(Please make sure to run `docker-compose build` command each time making change)

### :floppy_disk: Accessing container DB

```
URI mongodb://localhost:27121 (27121 default Specified PORT in docker-compose.yml file)
```

## :file_folder: Local configuration

```
yarn install
```

### :package: Creating dist source

```
yarn install
yarn build
```

### :airplane: Running application

```
yarn start
```

### :running: Running application in Development env

```
yarn start:dev
```

### :bug: Check linting

Use below command to check linting issues

```
yarn lint
```

Use below command to automatically fix the problems

```
yarn lint:fix
```

Use below command to automatically fix the problems without saving the changes to the file system

```
yarn lint:fixdry
```

## Directory Structure

```
- src
  - config (contains project configuration)
  - db (database configuration)
  - schema (contains mongoose schema)
  - services (contains services which data thoughout application)
  - test (contains unit test files)
  - utils
    - types (contains typescript definations)
  - workers (worker files)
  server.ts (entry point)
  trot-race.ts
```

## Test Details

### :white_check_mark: Run test

```
yarn test
```

### :white_check_mark: Get the code coverage report

```
yarn test:coverage
```
