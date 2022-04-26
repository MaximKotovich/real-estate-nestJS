import { BaseEntity } from './base-entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'location' })
export class LocationEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  address: string;
}
