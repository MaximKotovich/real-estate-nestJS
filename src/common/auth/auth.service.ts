import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../../service/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
  }

  async validateUser(login: any, pass: any) {
    const user = await this.userService.findOne(login);
    if (!user) {
      throw new BadRequestException();
    }

    const passFl = await bcrypt.compare(pass, user.pass);
    if (user && passFl) {
      const { pass, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const candidate = await this.userService.findOne(user.login);
    const payloadAccessToken = { login: user.login, sub: candidate.id, roles: candidate.roles.map((el) => el.role) };
    const payloadRefreshToken = { sub: candidate.id };
    return {
      access_token: this.jwtService.sign(payloadAccessToken, {
        secret: this.configService.get("JWT_SECRET"),
        expiresIn: this.configService.get("JWT_EXPIRES_IN")
      }),
      refresh_token: this.jwtService.sign(payloadRefreshToken, {
        secret: this.configService.get("REFRESH_TOKEN_SECRET"),
        expiresIn: this.configService.get("REFRESH_EXPIRES_IN")
      })
    };
  }

}
