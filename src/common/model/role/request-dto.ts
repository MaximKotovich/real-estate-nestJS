import { ApiProperty } from "@nestjs/swagger";


export class CreateRoleDto {
  @ApiProperty()
  role: string
}

export class addingRoleDto {
  @ApiProperty()
  userId: number

  @ApiProperty()
  role: string
}
