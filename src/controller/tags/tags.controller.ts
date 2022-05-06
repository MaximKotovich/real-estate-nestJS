import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../../common/auth/guards/authenticated.guard";
import { RolesGuard } from "../../common/auth/guards/roles.guard";
import { Roles } from "../../common/decorators/roles-auth.decorator";
import { TagsService } from "../../service/tags/tags.service";
import { CreateTagDto } from "../../common/model/tags/request-dto";
import { TagDto } from "../../common/model/tags/response-dto";

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(
    private tagsService:TagsService
  ) {
  }

  @ApiOperation({ summary: "Adding tag" })
  @ApiResponse({ status: 201, description: "Created tag", type: TagDto})
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Something wrong" })
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles('admin')
  @Post("/create")
  async create(@Body() createTagDto: CreateTagDto):Promise<TagDto> {
    return await this.tagsService.createTag(createTagDto);
  }

  @ApiOperation({ summary: "Remove tag" })
  @ApiResponse({ status: 201, description: "Created tag", type: TagDto})
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Something wrong" })
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles('admin')
  @Delete("/remove/:id")
  async remove(@Param('id',ParseIntPipe) id: number) {
    return await this.tagsService.removeTag(id);
  }


}
