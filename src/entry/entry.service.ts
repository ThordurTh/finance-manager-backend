import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
// import { User } from 'src/users/entities/user.entity';

interface FindAllOptions {
  relations?: string[];
}

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // ~~~ CREATE A NEW ENTRY ~~~
  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const { categoryName, userId, ...entryData } = createEntryDto;

    // Fetch the category from the database based on the provided categoryName
    let category = await this.categoryRepository.findOne({
      where: { name: categoryName },
    });
    // Fetch the user from the database based on the provided userId
    let user = await this.userRepository.findOne({
      where: { id: userId },
    });

    // If it doesn't find a category, assign the category with the name: 'other'
    if (!category) {
      category = await this.categoryRepository.findOne({
        where: { name: 'other' },
      });
    }
    // If it doesn't find a user, assign the guest id
    if (!user) {
      user = await this.userRepository.findOne({
        where: { username: 'Guest' },
      });
    }
    // Create a new Entry entity and associate it with the fetched Category
    const entry = this.entryRepository.create({
      ...entryData,
      user,
      category, // Assign the fetched Category to the category field of Entry
    });

    // Save the new Entry to the database
    return this.entryRepository.save(entry);
  }

  // ~~~ RETRIEVE ALL ENTRIES ~~~
  findAll(options: FindAllOptions) {
    return this.entryRepository.find(options); // Pass options to find method
  }

  findOne(id: number) {
    return this.entryRepository.findOneBy({ id });
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return this.entryRepository.update(id, updateEntryDto);
  }

  remove(id: number) {
    return this.entryRepository.delete(id);
  }
}
