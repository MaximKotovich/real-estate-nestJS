import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Body, Controller, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { addingRoleDto, CreateRoleDto } from "../../common/model/role/request-dto";
import { RoleService } from "../../service/role/role.service";
import { AuthenticatedGuard } from "../../common/auth/guards/authenticated.guard";
import { RolesGuard } from "../../common/auth/guards/roles.guard";
import { Roles } from "../../common/decorators/roles-auth.decorator";

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
  @Roles('admin')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async createRole (@Body() createRoleDTO: CreateRoleDto) {
    return this.roleService.createRole(createRoleDTO)
  }

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 201, description: 'Create role' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @Patch('/adding')
  // @Roles('admin')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async addingRole (@Body() addingRole: addingRoleDto) {
    return this.roleService.addingRole(addingRole)
  }
}
