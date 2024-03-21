import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  autoLoadEntities: true,
  // entities: ['dist/src/**/*.entity{.ts, .js}'],
  entities: [
    'dist/src/entry/entities/entry.entity.js',
    'dist/src/categories/entities/category.entity.js',

    'dist/src/users/entities/user.entity.js',
    // 'dist/src/user/entities/user.entity.js',
  ],
  migrations: ['dist/src/migrations/*.js'],
  logging: true,
};

const dataSource = new DataSource(dbConfig as DataSourceOptions);
export default dataSource;
