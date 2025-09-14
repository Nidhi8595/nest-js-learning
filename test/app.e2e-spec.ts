import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();// start the server

    prisma = app.get(PrismaService);

    await prisma.cleanDb();// clean the database before running any tests
  });

  // after testing done
  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      it.todo('should sign up');
    })
    describe('Signin', () => {
      it.todo('should sign in');
    })
  })

  describe('User', () => {
    describe('Get me', () => {
    })
    describe('Edit user', () => {
    })
  })

  describe('Bookmarks', () => {
    describe('Create bookmark', () => {
    })
    describe('Get bookmarks', () => {
    })
    describe('Get bookmark by id', () => {
    })
    describe('Edit bookmark', () => {
    })
    describe('Delete bookmark', () => {
    })
  })
});