import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { Entry } from "src/entry/entities/entry.entity";
import { User } from "./entities/user.entity";
import { EntryModule } from "src/entry/entry.module";

@Module({
  imports: [TypeOrmModule.forFeature([User, Entry]), EntryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
