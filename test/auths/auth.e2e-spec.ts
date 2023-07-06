import { AuthEmailLoginDto } from '../../src/auth/dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from '../../src/auth/dto/auth-register-login.dto';
import { AuthUpdateDto } from '../../src/auth/dto/auth-update.dto';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { faker } from '@faker-js/faker';
import request from 'supertest';

describe('Auth E2E', () => {
  const adminLoginDto = new AuthEmailLoginDto();
  adminLoginDto.email = 'long@example.com';
  adminLoginDto.password = 'secret';

  const clientLoginDto = new AuthEmailLoginDto();
  clientLoginDto.email = 'Letha.Mitchell7@hotmail.com';
  clientLoginDto.password = 'secret';

  let app: INestApplication;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modRef.createNestApplication();
    await app.init();
  });

  it('Admin login - should get a JWT and user`s info', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/admin/email/login')
      .send(adminLoginDto)
      .expect(200);
    expect(loginReq.body.token && loginReq.body.refreshToken);
    expect(loginReq.body.user);
  });

  it('Should get user`s infor successfully', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/admin/email/login')
      .send(adminLoginDto)
      .expect(200);

    const token = loginReq.body.token;
    return request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toEqual(1);
        expect(body.firstName).toEqual('Long');
        expect(body.lastName).toEqual('VQ');
        expect(body.role).toEqual('admin');
      });
  });

  it('Should return message: "Unprocessable Entity"', async () => {
    await request(app.getHttpServer())
      .post('/auth/email/login')
      .send(adminLoginDto)
      .expect(422);
  });

  it('Client login - should login successfully', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/email/login')
      .send(clientLoginDto)
      .expect(200);

    const token = loginReq.body.token;
    return request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(({ body }) => {
        expect(body.firstName).toEqual('Bethel');
        expect(body.lastName).toEqual('Harvey');
        expect(body.role).toEqual('client');
      });
  });

  const registerDto = new AuthRegisterLoginDto();
  const newLoginDto = new AuthEmailLoginDto();

  it('Should register successfully', async () => {
    // Info to register
    registerDto.email = faker.internet.email();
    registerDto.firstName = faker.person.firstName();
    registerDto.lastName = faker.person.lastName();
    registerDto.password = 'secret';

    await request(app.getHttpServer())
      .post('/auth/email/register')
      .send(registerDto)
      .expect(204);

    // Infor to login
    newLoginDto.email = registerDto.email;
    newLoginDto.password = registerDto.password;

    return request(app.getHttpServer())
      .post('/auth/email/login')
      .send(newLoginDto)
      .expect(200)
      .expect(({ body }) => {
        expect(body.user.firstName).toEqual(registerDto.firstName);
        expect(body.user.lastName).toEqual(registerDto.lastName);
        expect(body.user.role).toEqual('client');
      });
  });

  it('Client should get user`s infor successfully after login', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/email/login')
      .send(newLoginDto)
      .expect(200);

    const token = loginReq.body.token;
    return request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(({ body }) => {
        expect(body.firstName).toEqual(registerDto.firstName);
        expect(body.lastName).toEqual(registerDto.lastName);
        expect(body.role).toEqual('client');
      });
  });

  it('Client should refresh token successfully after login', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/email/login')
      .send(newLoginDto)
      .expect(200);

    const token = loginReq.body.token;
    return request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(({ body }) => {
        expect(body.token);
        expect(body.refreshToken);
        expect(body.tokenExpires).toBeGreaterThan(Date.now());
      });
  });

  it('Client should logout successfully after login', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/email/login')
      .send(newLoginDto)
      .expect(200);

    const token = loginReq.body.token;
    return request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', 'Bearer ' + token)
      .expect(204);
  });

  const updateUserDto = new AuthUpdateDto();
  updateUserDto.firstName = 'firstNameChanged';

  it('Client should update firstName successfully', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/email/login')
      .send(newLoginDto)
      .expect(200);

    const token = loginReq.body.token;
    return request(app.getHttpServer())
      .patch('/auth/me')
      .set('Authorization', 'Bearer ' + token)
      .send(updateUserDto)
      .expect(200)
      .expect(({ body }) => {
        expect(body.firstName).toEqual(updateUserDto.firstName);
      });
  });

  updateUserDto.lastName = 'lastNameChanged';
  it('Client should update lastName successfully', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/email/login')
      .send(newLoginDto)
      .expect(200);

    const token = loginReq.body.token;
    return request(app.getHttpServer())
      .patch('/auth/me')
      .set('Authorization', 'Bearer ' + token)
      .send(updateUserDto)
      .expect(200)
      .expect(({ body }) => {
        expect(body.lastName).toEqual(updateUserDto.lastName);
      });
  });

  it('Client should remove account successfully', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/email/login')
      .send(newLoginDto)
      .expect(200);

    const token = loginReq.body.token;
    return request(app.getHttpServer())
      .delete('/auth/me')
      .set('Authorization', 'Bearer ' + token)
      .expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
