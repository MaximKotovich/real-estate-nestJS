import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base-entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'country' })
export class CountryEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  country: string
}
