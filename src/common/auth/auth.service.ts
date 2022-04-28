import { BadRequestException, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "../../service/user/user.service";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(
    private userService:UserService,
    private jwtService:JwtService
  ) {}

  async validateUser(login:any, pass:any){
    const user = await this.userService.findOne(login)
    if (!user) {
      throw new BadRequestException()
    }

    const passFl = await bcrypt.compare(pass, user.pass)
    if (user && passFl) {
      const { pass, ...result } = user
      return result
    }
    return null
  }

  async login (user: any) {
    const candidate = await this.userService.findOne(user.login)
    const payload = { login: user.login, sub: candidate.id, roles: candidate.roles.map((el)=> el.role)}
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
