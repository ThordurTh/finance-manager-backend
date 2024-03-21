import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Category } from '../categories/entities/category.entity';
import { CategoriesModule } from '../categories/categories.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry, Category, User]),
    CategoriesModule,
    UsersModule,
  ],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
