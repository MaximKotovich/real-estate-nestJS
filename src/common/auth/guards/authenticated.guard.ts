import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../../service/user/user.service";


@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService
  ) {
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    try {
      const tokenPayload: any = request.cookies.jwt && this.jwtService.decode(request.cookies.jwt);
      if (tokenPayload.exp * 1000 > Date.now()) {
        return !!tokenPayload;
      }
      const getRefreshToken = jwt.verify(request.cookies.refresh_token, this.configService.get("REFRESH_TOKEN_SECRET"));
      const user = await this.userService.getUser(Number(getRefreshToken.sub));
      request.user = user;

      const payloadAccessToken = { login: user.login, sub: user.id, roles: user.roles.map((el) => el.role) };
      const newToken = this.jwtService.sign(payloadAccessToken, {
        secret: this.configService.get("JWT_SECRET"),
        expiresIn: this.configService.get("JWT_EXPIRES_IN")
      });
      response.cookie("jwt", newToken);
      return !!newToken;
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: "User unauthorized"
      }, HttpStatus.UNAUTHORIZED);
    }
  }
}
