import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEntryDto {
  @IsNotEmpty()
  amount: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsIn(['income', 'expense'])
  incomeExpense: 'income' | 'expense';

  @IsNotEmpty()
  categoryName: string;

  @IsNotEmpty()
  userId: number;

  constructor(
    amount: number,
    date: Date,
    currency: string,
    name: string,
    comment: string,
    incomeExpense: 'income' | 'expense',
    categoryName: string,
    userId: number,
  ) {
    this.amount = amount;
    this.date = date;
    this.currency = currency;
    this.name = name;
    this.comment = comment;
    this.incomeExpense = incomeExpense;
    this.categoryName = categoryName;
    this.userId = userId;
  }
}
