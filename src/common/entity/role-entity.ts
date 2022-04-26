import { BaseEntity } from './base-entity';
import { Column, Entity, ManyToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from "./user-entity";

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  role: string

  @ApiProperty()
  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[]
}
