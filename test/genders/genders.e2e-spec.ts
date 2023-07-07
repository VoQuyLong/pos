import { AppModule } from '../../src/app.module';
import { CreateGenderDto } from '../../src/genders/dto/create-gender.dto';
import { UpdateGenderDto } from '../../src/genders/dto/update-gender.dto';
import { AuthEmailLoginDto } from '../../src/auth/dto/auth-email-login.dto';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { Gender } from '@myalias/genders/entities/gender.entity';

describe('Genders - /genders (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let createdGenderId: number;

  const adminLoginDto = new AuthEmailLoginDto();
  const createGenderDto = new CreateGenderDto();
  const updateGenderDto = new UpdateGenderDto();

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modRef.createNestApplication();
    await app.init();

    adminLoginDto.email = 'long@example.com';
    adminLoginDto.password = 'secret';
    createGenderDto.name = faker.person.gender();
    updateGenderDto.name = faker.person.gender();

    const loginReq: request.Response = await request(app.getHttpServer())
      .post('/auth/admin/email/login')
      .send(adminLoginDto)
      .expect(200);

    token = loginReq.body.token;
  });

  it('Create [POST /genders]', async () => {
    await request(app.getHttpServer())
      .post('/genders')
      .set('Authorization', 'Bearer ' + token)
      .send(createGenderDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toBeDefined();
        expect(body.name).toBeDefined();
        expect(body.name).toEqual(createGenderDto.name);
        createdGenderId = body.id;
      });
  });

  it('Get one gender [GET /genders/:id]', async () => {
    await request(app.getHttpServer())
      .get(`/genders/${createdGenderId}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        expect(body.name).toBeDefined();
        expect(body.name).toEqual(createGenderDto.name);
      });
  });

  it(`Update [PATCH /genders/:id]`, async () => {
    await request(app.getHttpServer())
      .patch(`/genders/${createdGenderId}`)
      .set('Authorization', 'Bearer ' + token)
      .send(updateGenderDto)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        expect(body.name).toBeDefined();
        expect(body.id).toBeDefined();
        expect(body.id).toEqual(createdGenderId);
        expect(body.name).toEqual(updateGenderDto.name);
      });
  });

  it(`Delete [DELETE /genders/:id]`, async () => {
    await request(app.getHttpServer())
      .delete(`/genders/${createdGenderId}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204);
  });

  it('Get all genders [GET /genders]', async () => {
    await request(app.getHttpServer())
      .get('/genders')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        expect(body.data).toBeDefined();
        expect(Array.isArray(body.data)).toBe(true);

        body.data.forEach((gender: Gender) => {
          expect(gender.id).toBeDefined();
          expect(gender.name).toBeDefined();
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
