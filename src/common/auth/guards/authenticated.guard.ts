import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken'
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(
    private configService:ConfigService
  ) {
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    try {
      const getToken = jwt.verify(request.cookies.jwt, this.configService.get('JWT_SECRET'))
      return !!getToken
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'User unauthorized'
      }, HttpStatus.UNAUTHORIZED)
    }
  }
}
