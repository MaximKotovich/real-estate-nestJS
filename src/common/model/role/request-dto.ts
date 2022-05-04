import { ApiProperty } from "@nestjs/swagger";


export class CreateRoleDto {
  @ApiProperty()
  role: string
}

export class AddingRoleDto {
  @ApiProperty()
  userId: number

  @ApiProperty()
  role: string
}
