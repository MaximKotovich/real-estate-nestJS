import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UnauthorizedException } from "@nestjs/common";


export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(
    private authService:AuthService
  ) {
    super();
  }

  async validate(login:string, pass: string){
    const user = await this.authService.validateUser(login, pass)

    if(!user) {
      throw new UnauthorizedException()
    }

    return user
  }

}
