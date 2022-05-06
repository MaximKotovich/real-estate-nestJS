import { BaseEntity } from './base-entity';
import { Column, Entity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tags' })
export class TagsEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  tag: string
}
