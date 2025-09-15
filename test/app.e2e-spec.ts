import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
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
    await app.listen(3333);
    prisma = app.get(PrismaService);

    await prisma.cleanDb();// clean the database before running any tests
    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  });

  // after testing done
  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'vlad@gmail.com',
      password: '123',
    }; // to be used by both signup and signin

    describe('Signup', () => {
      it('should signup', () => {

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);

      })
    })


    describe('Signin', () => {
      it('should signin', () => {

        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200);

      })
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