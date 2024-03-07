import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateEntryDto } from '../src/entry/dto/create-entry.dto';
import { CreateCategoryDto } from '../src/categories/dto/create-category.dto';
import { CategoriesService } from '../src/categories/categories.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    categoriesService = moduleFixture.get(CategoriesService);

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/ (GET) entry controller', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });

  // GET TEST
  // describe('/entry (GET) entry controller', () => {
  //   it('/ (GET) should return an array of objects matching the DTO used in POST test', async () => {
  //     // Perform GET request
  //     const { body } = await request(app.getHttpServer())
  //       .get('/entry')
  //       .expect(200);

  //     // Expect the response body to be an array
  //     expect(Array.isArray(body)).toBe(true);

  //     // Expect the response body to contain an object matching the DTO used in POST test
  //     expect(
  //       body.map(
  //         (entry) =>
  //           typeof entry.amount === 'number' &&
  //           typeof entry.currency === 'string' &&
  //           typeof entry.name === 'string' &&
  //           typeof entry.comment === 'string',
  //       ),
  //     );
  //   });
  // });

  describe('/ (POST) entry controller', () => {
    it('should create a new entry when passed a valid entry', async () => {
      // Arrange
      const savedCategory = await categoriesService.create(
        new CreateCategoryDto('Take-out'),
      );
      console.log('savedCategory', savedCategory);

      const validEntry = new CreateEntryDto(
        75,
        new Date(),
        'DKK',
        'Burger King',
        'meh',
      );
      validEntry.category = savedCategory;

      // Act
      const { body } = await request(app.getHttpServer())
        .post('/entry')
        .send(validEntry)
        .expect(201);

      console.log('savedEntry', body);

      expect(body.amount).toEqual(100);
      expect(body.id).toBeDefined();
    });
    // it('should create a new entry when passed a valid entry', async () => {
    //   const validEntry = new CreateEntryDto(
    //     100,
    //     new Date(),
    //     'DKK',
    //     'Umuts Pizza',
    //     'I should not buy takeout',
    //   );

    //   const { body } = await request(app.getHttpServer())
    //     .post('/entry')
    //     .send(validEntry)
    //     .expect(201);

    //   expect(body.amount).toEqual(100);
    //   expect(body.id).toBeDefined();
    // });

    // it('should return error message when passed an invalid entry', async () => {
    //   const inValidEntry = new CreateEntryDto(
    //     100,
    //     new Date(),
    //     'DKK',
    //     '',
    //     'I should not buy takeout',
    //   );

    //   const { body } = await request(app.getHttpServer())
    //     .post('/entry')
    //     .send(inValidEntry)
    //     .expect(400);

    //   expect(body.message[0]).toEqual('name should not be empty');
    // });
  });
});