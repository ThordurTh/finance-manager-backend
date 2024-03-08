import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

type IncomeExpense = 'income' | 'expense';
@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  currency: string;

  @Column()
  name: string;

  @Column()
  comment: string;

  @Column()
  incomeExpense: IncomeExpense;

  @ManyToOne(() => Category, (category) => category.entries)
  category: Category;
}
