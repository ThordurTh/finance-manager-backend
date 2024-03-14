import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Entry } from '../../entry/entities/entry.entity';
import { Role } from '../../../role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @OneToMany(() => Entry, (entry) => entry.user)
  entries: Entry[];
}
