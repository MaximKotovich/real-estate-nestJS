import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateRoleDto } from "../../common/model/role/request-dto";
import { RoleService } from "../../service/role/role.service";

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(
    private roleService:RoleService
  ) {
  }


  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 201, description: 'Create role' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @Post('/create')
  // @UseGuards(AuthGuard)
  async createRole (@Body() createRoleDTO: CreateRoleDto) {
    return this.roleService.createRole(createRoleDTO)
  }
}
