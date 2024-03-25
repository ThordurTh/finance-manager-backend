// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication, ValidationPipe } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
// import { CreateEntryDto } from '../src/entry/dto/create-entry.dto';
// import { CreateCategoryDto } from '../src/categories/dto/create-category.dto';
// import { CategoriesService } from '../src/categories/categories.service';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;
//   let categoriesService: CategoriesService;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     categoriesService = moduleFixture.get(CategoriesService);

//     app.useGlobalPipes(new ValidationPipe());
//     await app.init();
//   });

//   describe('/ (GET) entry controller', () => {
//     it('/ (GET)', () => {
//       return request(app.getHttpServer())
//         .get('/')
//         .expect(200)
//         .expect('Hello World!');
//     });
//   });

//   describe('/ (POST) entry controller', () => {
//     it('should create a new entry when passed a valid entry', async () => {
//       // Arrange
//       const savedCategory = await categoriesService.create(
//         new CreateCategoryDto('Take-out'),
//       );
//       console.log('savedCategory', savedCategory);

//       const validEntry = new CreateEntryDto(
//         75,
//         new Date(),
//         'DKK',
//         'Burger King',
//         'meh',
//       );
//       validEntry.categoryName = savedCategory;

//       // Act
//       const { body } = await request(app.getHttpServer())
//         .post('/entry')
//         .send(validEntry)
//         .expect(201);

//       console.log('savedEntry', body);

//       expect(body.amount).toEqual(100);
//       expect(body.id).toBeDefined();
//     });
//   });
// });

import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../src/users/entities/user.entity';
import { UsersService } from '../src/users/users.service';

enum Role {
  User = 'user',
  Admin = 'admin',
}

describe('UserService', () => {
  let service: UsersService;

  // Create a test user before running tests
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue({
              id: 1,
              username: 'testuser',
              password: 'testpassword',
              role: Role.User,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create({
      username: 'testuser',
      password: 'testpassword',
      role: Role.User,
    });
    expect(user).toEqual({
      id: expect.any(Number),
      username: 'testuser',
      password: 'testpassword',
      role: 'user',
    });
  });
});
