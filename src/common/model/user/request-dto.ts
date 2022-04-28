import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
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
}

export class LoginUserDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  pass: string;
}
