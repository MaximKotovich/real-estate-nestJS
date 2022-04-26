import { BaseEntity } from './base-entity';
import { Column, Entity, ManyToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { RealEstateEntity } from "./real-estate-entity";

@Entity({ name: 'tags' })
export class TagsEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  tag: string

  @ApiProperty({ type: () => RealEstateEntity })
  @ManyToOne(() => RealEstateEntity, (realEstate) => realEstate, { nullable: true })
  realEstate: RealEstateEntity[]
}
