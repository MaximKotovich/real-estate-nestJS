import { ApiProperty } from "@nestjs/swagger";
import { WithIdModel } from "../with-id/with-id.model";
import { UserResponseDto } from "../user/response-dto";


class LocationDto {
  @ApiProperty()
  address: string

  @ApiProperty()
  country: string

  @ApiProperty()
  town: string
}

export class GetOneEstateResponseDto extends WithIdModel{
  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  coast: string

  @ApiProperty()
  type: string

  @ApiProperty()
  area: number

  @ApiProperty()
  location: LocationDto

  @ApiProperty()
  owner: UserResponseDto

}
