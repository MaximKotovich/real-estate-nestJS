import { ApiProperty } from "@nestjs/swagger";
import { WithIdModel } from "../with-id/with-id.model";

export class UserResponseDto extends WithIdModel{
  @ApiProperty()
  name: string;

  @ApiProperty()
  surName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  pass: string;

  @ApiProperty()
  confirm: boolean;

  @ApiProperty()
  confirmKey: string;

}
