## Description

practice project with Nest.js implementing Planning Poker 

### structure

`lib` = business logic, pure function

`service` = application interface, interact with database but no UI (HTTP)

`api` = ui layer, in this case HTTP Api server

`database` = database and ORM

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

