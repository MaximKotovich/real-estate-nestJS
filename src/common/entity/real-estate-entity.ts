import { BaseEntity } from './base-entity';
import { Column, Entity, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from "./user-entity";
import { LocationEntity } from "./location-entity";
import { TagsEntity } from "./tags-entity";

@Entity({ name: 'real_estate' })
export class RealEstateEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  coast: string;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  area: number;

  @ApiProperty()
  @OneToOne(() => LocationEntity, (location) => location.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  location: LocationEntity;

  // @ApiProperty()
  // @OneToMany(() => CarPhotosEntity, (carPhoto) => carPhoto.car)
  // images: CarPhotosEntity[];
  //
  @ApiProperty()
  @Column()
  images: string;

  @ApiProperty({type: [TagsEntity]})
  @OneToMany(() => TagsEntity, (tag) => tag.realEstate, {nullable: true})
  tags: TagsEntity[]

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.id)
  owner: UserEntity;

}
