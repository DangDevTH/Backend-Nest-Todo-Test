<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
รายเอียด Todo โปรเจค พัฒนาด้วย
* Nestjs
* PostgreSQL
* TypeORM

## Features
ระบบการจัดการรูปแบบ CRUD จัดการข้อมูล User, Task และ Comment
* ระบบสมัครสมาชิก และ ล็อกอิน
* User สามารถเพิ่ม Task (One To Many) ได้หลาย Task แก้ไข Task และ ลบ Task ได้เฉพาะของตัวเอง
* User สามารถ Comment ได้หลายครั้ง (One To Many) แก้ไข Comment และ ลบ Comment ได้เฉพาะของตัวเอง
* User สมารถคอมเม้น Task ของผู้อื่นได้
* ระบบค้นหา Task


## .ENV
ตัวอย่าง .ENV
```bash
  PORT=3001
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
  DATABASE_USER=postgres
  DATABASE_PASSWORD=
  DATABASE_NAME=tododb
  DATABASE_SYNC=true
  DATABASE_AUTOLOAD=true
  JWT_SECRET=opUiz8m3pw1khS44lOn8drr4FhZXx5fO
  JWT_TOKEN_AUDIENCE=localhost:3000
  JWT_TOKEN_ISSUER=localhost:3000
  JWT_ACCESS_TOKEN_TTL=84600
```


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

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Route Users
สมัครสมาชิก
POST: [http://localhost:3001/users](http://localhost:3001/users)
* header: { "Content-Type", "application/json" }
```bash
  {
    "username": "dangdev",
    "email": "dangdev@gmail.com",
    "password": "@Xxx1234",
    "password_confirm": "@Xxx1234"
  }
```

ระบบล็อกอิน
POST: [http://localhost:3001/users](http://localhost:3001/users)
* header: { "Content-Type", "application/json" }
```bash
  {
    "email": "dangdev@gmail.com",
    "password": "@Xxx1234"
  }
```

แสดงผลข้อมูลตัวเอง
GET: [http://localhost:3001/users](http://localhost:3001/users/me)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }


แก้ไขข้อมูล User ของมูลตัวเอง
PATCH: [http://localhost:3001/users](http://localhost:3001/users)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }
```bash
  {
    "username": "dangDev"
  }
```


ลบข้อมูล User ของตัวเอง
DELETE: [http://localhost:3001/users](http://localhost:3001/users)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }


## Route Tasks
แสดงข้อมูล Tasks ทั้งหมด
GET: [http://localhost:3001/tasks](http://localhost:3001/tasks)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }


ค้นหาข้อมูล task_id ของ Task
GET: [http://localhost:3001/tasks/2](http://localhost:3001/tasks/2)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }


ค้นหา Task ด้วย Query ที่มี t ตัวใดตัวหนึ่งอยู่ภายใน titil
GET: [http://localhost:3001/tasks/search/?title=t](http://localhost:3001/tasks/search/?title=t)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }


เพิ่มข้อมูล Task
POST: [http://localhost:3001/tasks](http://localhost:3001/tasks)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }
```bash
  {
    "title": "new tesk",
    "description": "new description",
    "priority": "medium",
    "due_date": "2024-02-05"
  }
```

แก้ไข Task โดยค้นหา task_id แล้วอัพเดต
PATCH: [http://localhost:3001/tasks](http://localhost:3001/tasks)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }
```bash
  {
    "task_id": 1,
    "title": "test task ",
    "description": "new description test",
    "status": "pending",
    "priority": "low",
    "due_date": "2025-12-02"
  }
```

ลบ Task โดย task_id
DELETE: [http://localhost:3001/tasks/1](http://localhost:3001/tasks/1)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }


## Route Comments
แสดงข้อมูล Comments โดยค้นหา comment_id
GET: [http://localhost:3001/comments/1](http://localhost:3001/comments/1)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }


แสดงข้อมูล Comments โดยค้นหาข้อ comment ที่เกี่ยวข้องกับ Tasks Foreign Key task_id และ skip คือ ค้นหาข้อมูลแรก limit 10
GET: [http://localhost:3001/comments/?taskId=1&skip=0](http://localhost:3001/comments/?taskId=1&skip=0)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }


เพิ่ม Comments ไปใน Task ที่แสดงความคิดเห็น โดยอ้างอิง task_id
POST: [http://localhost:3001/comments](http://localhost:3001/comments)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }
```bash
  {
    "task_id": 1,
    "comment": "ไอที"
  }
```

แก้ไข Comments 
PATCH: [http://localhost:3001/comments](http://localhost:3001/comments)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }
```bash
  {
    "comment_id": 1,
    "comment": "new it"
  }
```

ลบ Comment
DELETE: [http://localhost:3001/comments/1](http://localhost:3001/comments/)
* Authorization Bearer token is Required
* header: { "Content-Type", "application/json" }

