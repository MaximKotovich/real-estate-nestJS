import { BaseEntity } from './base-entity';
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from "./role-entity";

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  surName: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  login: string;

  @ApiProperty()
  @Column()
  pass: string;

  @ApiProperty({ type: () => [RoleEntity] })
  @ManyToMany(() => RoleEntity, (role) => role.users)
  roles: RoleEntity[]

  @ApiProperty()
  @Column()
  confirm: boolean;

  @ApiProperty()
  @Column()
  confirm_key: string;
}
