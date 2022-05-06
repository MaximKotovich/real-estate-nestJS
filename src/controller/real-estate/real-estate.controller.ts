import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthenticatedGuard } from "../../common/auth/guards/authenticated.guard";
import { NewEstateDto, SearchRealEstateDto, UpdateEstateDto } from "../../common/model/real-estate/request-dto";
import { RealEstateService } from "../../service/real-estate/real-estate.service";
import { GetOneEstateResponseDto } from "../../common/model/real-estate/response-dto";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("real-estate")
@Controller("real-estate")
@UseGuards(AuthenticatedGuard)
export class RealEstateController {
  constructor(
    private realEstateService: RealEstateService
  ) {
  }

  @ApiOperation({ summary: "Delete role" })
  @ApiResponse({ status: 201, description: "Deleted role" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Something wrong" })
  @Post("/create")
  async createPost(@Body() newEstateDto: NewEstateDto, @Req() req) {
    return await this.realEstateService.createPost(newEstateDto, req.user.id);
  }

  @ApiOperation({ summary: "Delete role" })
  @ApiResponse({ status: 201, description: "Deleted role" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Something wrong" })
  @Patch("/patch")
  async patchEstate(@Body() updateEstateDto: UpdateEstateDto) {
    return await this.realEstateService.patchEstate(updateEstateDto);
  }

  @ApiOperation({ summary: "Advanced Search" })
  @ApiResponse({ status: 201, description: "Success" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Something wrong" })
  @Post("/advanced-search")
  async advancedSearch(@Body() searchRealEstateDto: SearchRealEstateDto) {
    return await this.realEstateService.advancedSearch(searchRealEstateDto);
  }

  @ApiOperation({ summary: "Get RealEstate" })
  @ApiResponse({ status: 201, description: "Success"})
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Something wrong" })
  @Get("/get/:id")
  async getRealEstate(@Param() estateId): Promise<GetOneEstateResponseDto> {
    return await this.realEstateService.findOne(estateId.id);
  }

  @ApiOperation({ summary: 'uploadFile' })
  @ApiResponse({ status: 201, description: 'uploadFile' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() image) {
    return await this.realEstateService.uploadImage(image);
  }
}
