import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base-entity";
import { ApiProperty } from "@nestjs/swagger";
import { CountryEntity } from "./country-entity";


@Entity({ name: 'town' })
export class TownEntity extends BaseEntity {

  @ApiProperty()
  @Column()
  town: string

  @ApiProperty()
  @ManyToOne(() => CountryEntity, (country) => country.id)
  country: CountryEntity;

}
