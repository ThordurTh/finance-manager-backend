import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

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
  ) {}

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const { categoryName, ...entryData } = createEntryDto;

    // Fetch the category from the database based on the provided categoryName
    let category = await this.categoryRepository.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      category = await this.categoryRepository.findOne({
        where: { name: 'other' },
      });
    }
    // Create a new Entry entity and associate it with the fetched Category
    const entry = this.entryRepository.create({
      ...entryData,
      category, // Assign the fetched Category to the category field of Entry
    });

    // Save the new Entry to the database
    return this.entryRepository.save(entry);
  }

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
