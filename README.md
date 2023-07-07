pse v1.0.0
================================


[![PSE - Nestjs](https://img.shields.io/badge/dependency-Nestjs-red?logo=Nestjs&logoColor=Red)](https://nestjs.com/)
  

Population search engine - nestjs implementation 
---------------------------------------------
pse is an simple app I use for learning for first week at Vitalify Asia.

Features
--------
  
- [Authentication](./docs/authentication.md)
- [Graphql api](./docs/graphql.md)
- [Restful api](./docs/restful.md)
- [Auto seeding data](./docs/database.md)
- [Unit testing](./docs/test.md)
- Two enviroment: `test` and `development`

Framework
--------
- Nestjs
- TypeORM
- Jest

Installation
-------
1. Clone repository from github
```shell
git clone https://github.com/VoQuyLong/pse
```

Quick Start
-----------

#### Install dependencies
```bash
npm install
```

### Create a database
You need to create a database for `pse`, I prefer using `mysql`.

1. Create `.env`
- You can create .env from .env.example by:

```bash
cp .env .env.example
```

2. Fill `.env`
```bash
NODE_ENV=development
APP_NAME=app
BACKEND_DOMAIN=http://localhost
APP_PORT=3000
API_PREFIX=api
APP_FALLBACK_LANGUAGE=en
APP_HEADER_LANGUAGE=x-custom-lang
DATABASE_TYPE=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=pse_nestjs
DATABASE_USERNAME=root
DATABASE_SYNCHRONIZE=true
AUTH_JWT_SECRET=thisisasecret
AUTH_JWT_TOKEN_EXPIRES_IN=30m
AUTH_REFRESH_SECRET=thisisasecret
AUTH_REFRESH_TOKEN_EXPIRES_IN=2w

# Database test e2e
TEST_DATABASE_TYPE=mysql
TEST_DATABASE_HOST=localhost
TEST_DATABASE_PORT=3306
TEST_DATABASE_PASSWORD=yourpassword
TEST_DATABASE_NAME=test_pse_nestjs
TEST_DATABASE_USERNAME=root
TEST_DATABASE_SYNCHRONIZE=true

# Database Log
LOG_MODE=true
```

> Note: If you want to watch database log for debugging or anything, you need to set `LOG_MODE` to true.

### Run migration
1. Normal mode - migrate for main database
```bash
npm run migration:run
```
2. Test mode - migrate for test database
```bash
npm run migration:run:test
```

### Seeding 
1. Normal mode - seed for main database
```bash
npm run seed:run
```
2. Test mode - seed for test database
```bash
npm run seed:run:test
```

### Build 
```bash
npm run build
```

### Start
```bash
npm run start:prod
```

Note
----

_Source code_  
    https://github.com/VoQuyLong/pse

_Nest Documentation_  
    https://docs.nestjs.com/

_TypeORM Documentation_
    https://typeorm.io/
