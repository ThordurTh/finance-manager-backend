import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
// import { User } from '../../users/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.entries)
  user: User;

  // @ManyToOne(() => User, (user) => user.entries)
  // user: User;
}
