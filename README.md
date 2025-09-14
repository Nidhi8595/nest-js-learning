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

---> return user details upon signup (except hash i.e. - remove hash from object and store into a ignored variable using _)

---> API endpoint tested using "insomnia"

## created Signin logic and authentication

---> using DTO and validationPipes

---> find user using FindUnique()

---> compare passwords using argon.verify(dto.password, user.hash)

---> return user details upon signin (except hash)

## written script to rebuild container and apply migrations to db

---> "db:dev:rm":"docker compose rm db -s -f -v",
---> "db:dev:up":"docker compose rm db -d",
---> "prisma:dev:deploy":"npm run prisma migrate deploy",
---> "db:dev:restart":"npm run db:dev:rm && npm run db:dev:up && wait-up && prisma:dev:deploy",

## using config module

---> implemented in the root module(generally)
---> @nestjs/config lets you manage app settings and secrets via .env instead of hardcoding them.

## JWT token for authorization

---> npm i @nestjs/passport passport @nestjs/jwt passport-jwt

---> after user login this token will be returned and will have a expiry period

---> verifying that token using strategy (creating it as a separate provider for this specific purpose)

## Get endpoint for returning users existing in DB

---> Guards determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time

## Creating custom decorator to get user info

## Testing

---> Nestjs tests by taking the code of a complete module and compiling it, and creating a test module out of it