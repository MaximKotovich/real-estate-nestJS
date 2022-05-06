import { BaseEntity } from './base-entity';
import { Column, Entity, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from "./user-entity";
import { TagsEntity } from "./tags-entity";
import { AddressEntity } from "./address-entity";

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
  coast: number;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  area: number;

  @ApiProperty()
  @OneToOne(() => AddressEntity, (address) => address.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  address: AddressEntity;

  @ApiProperty()
  @Column('text', {
    nullable: true,
    array: true
  })
  images: string[];

  @ApiProperty()
  @Column({
    nullable: true
  })
  mainImage: string;

  @ApiProperty({type: [TagsEntity]})
  @OneToMany(() => TagsEntity, (tag) => tag.realEstate, {nullable: true})
  tags: TagsEntity[]

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.id)
  owner: UserEntity;

}
