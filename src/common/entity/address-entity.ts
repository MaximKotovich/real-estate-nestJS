import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base-entity";
import { ApiProperty } from "@nestjs/swagger";
import { TownEntity } from "./town-entity";

@Entity({ name: 'address' })
export class AddressEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  address: string

  @ApiProperty()
  @ManyToOne(() => TownEntity, (town) => town.id)
  town: TownEntity;
}
