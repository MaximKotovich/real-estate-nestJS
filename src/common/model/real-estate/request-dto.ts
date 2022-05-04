import { ApiProperty } from "@nestjs/swagger";
import { WithIdModel } from "../with-id/with-id.model";


export class NewEstateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  coast: string;

  @ApiProperty()
  area: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  town: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  mainImage: string;
}

export class UpdateEstateDto extends WithIdModel{
  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  coast?: string;

  @ApiProperty()
  area?: number;

  @ApiProperty()
  type?: string;

}

