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
import { NewEstateDto, UpdateEstateDto } from "../../common/model/real-estate/request-dto";
import { RealEstateService } from "../../service/real-estate/real-estate.service";
import { GetOneEstateResponseDto } from "../../common/model/real-estate/response-dto";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("real-estate")
@Controller("real-estate")
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
  @UseGuards(AuthenticatedGuard)
  async createPost(@Body() newEstateDto: NewEstateDto, @Req() req) {
    return await this.realEstateService.createPost(newEstateDto, req.user.id);
  }

  @ApiOperation({ summary: "Delete role" })
  @ApiResponse({ status: 201, description: "Deleted role" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Something wrong" })
  @Patch("/patch")
  @UseGuards(AuthenticatedGuard)
  async patchEstate(@Body() updateEstateDto: UpdateEstateDto) {
    return await this.realEstateService.patchEstate(updateEstateDto);
  }

  @ApiOperation({ summary: "Get RealEstate" })
  @ApiResponse({ status: 201, description: "Success"})
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Something wrong" })
  @Get("/get/:id")
  @UseGuards(AuthenticatedGuard)
  async getRealEstate(@Param() estateId): Promise<GetOneEstateResponseDto> {
    return await this.realEstateService.findOne(estateId.id);
  }

  @ApiOperation({ summary: 'uploadFile' })
  @ApiResponse({ status: 201, description: 'uploadFile' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @UseGuards(AuthenticatedGuard)
  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() image) {
    return await this.realEstateService.uploadImage(image);
  }
}
