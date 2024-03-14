import { Entity } from "typeorm/decorator/entity/Entity";
import { Entry } from "../../entry/entities/entry.entity";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Column } from "typeorm/decorator/columns/Column";
import { Role } from "role.enum";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  roles: Role[];

  @OneToMany(() => Entry, (entry) => entry.user)
  entries: Entry[];
}
