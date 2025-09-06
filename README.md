## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Setup of Authentication module
---- built signup and signin endpoints in AuthController using @Post decorator

## Setup of docker and postgres

--> docker ps, docker --version,  docker compose version, docker compose up -d --build, docker logs ''
--> setup prisma (a query builder) npm i -D prisma@latest, npm i -D prisma/client , npx prisma init

## created Models
--> User (id, email, hash, firstname(optional), lastname(optional))
--> Bookmark (id, title, Description(optional), link)

--> updated database url and then run 'npx prisma migrate dev' to read schema and generate migrations in the folder and push defined schema to the database

--> npx prisma studio

--> created prisma module

---> using @Global() decorator as common and not type

## created Signup logic and authentication

---> using DTO and validationPipes
--->  npm install class-validator class-transformer
---> npm install argon2(doesn't have limitation of 72 bytes) ,  npm install --save-dev @types/argon2

---> validation for not allowing duplicate credentials setup

---> return user details upon signup (except hash)

---> API endpoint tested using "insomnia"
