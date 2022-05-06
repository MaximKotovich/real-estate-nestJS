import { BaseEntity } from './base-entity';
import { Column, Entity, ManyToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from "./user-entity";
import { RealEstateEntity } from "./real-estate-entity";

@Entity({ name: 'booking' })
export class BookingEntity extends BaseEntity {
  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ApiProperty()
  @ManyToOne(() => RealEstateEntity, (realEstate) => realEstate.id)
  realEstate: RealEstateEntity;

  @ApiProperty()
  @Column({
    nullable: true,
    type: 'bigint'
  })
  dateStart: number

  @ApiProperty()
  @Column({
    nullable: true,
    type: 'bigint'
  })
  dateEnd: number
}
