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

  constructor(
    amount: number,
    date: Date,
    currency: string,
    name: string,
    comment: string,
    incomeExpense: 'income' | 'expense',
    categoryName: string,
  ) {
    this.amount = amount;
    this.date = date;
    this.currency = currency;
    this.name = name;
    this.comment = comment;
    this.incomeExpense = incomeExpense;
    this.categoryName = categoryName;
  }
}
