import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Post, Req, Request, Response, UseGuards } from "@nestjs/common";
import { UserService } from "../../service/user/user.service";
import { CreateUserDto, LoginUserDto } from "../../common/model/user/request-dto";
import { AuthService } from "../../common/auth/auth.service";
import { AuthenticatedGuard } from "../../common/auth/guards/authenticated.guard";
import { RolesGuard } from "../../common/auth/guards/roles.guard";
import { Roles } from "../../common/decorators/roles-auth.decorator";
import { LocalAuthGuard } from "../../common/auth/guards/locarl-auth.guard";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 201, description: "Create user" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Something wrong" })
  @Post("/registration")
  async registration(@Body() createUserDto: CreateUserDto) {
    return await this.userService.registration(createUserDto);
  }

  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: 201, description: "Login success" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Something wrong" })
  @UseGuards(LocalAuthGuard)
  @Post("/auth")
  async login(@Body() loginUserDto: LoginUserDto, @Response() response) {
    const token = await this.authService.login(loginUserDto);
    response.setHeader("Authorization", `Bearer ${token.access_token}`);
    response.cookie("jwt", token.access_token);
    response.cookie("refresh_token", token.refresh_token);
    response.end();
  }

  @Roles("admin")
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get("/get/:id")
  async getUser(@Param('id') id: number) {
    return await this.userService.getUser(id);
  }
}
