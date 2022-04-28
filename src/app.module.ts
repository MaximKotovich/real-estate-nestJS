import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from "./common/entity/entities";
import { REPOSITORY } from "./repository/repository";
import { SERVICES } from "./service/services";
import { CONTROLLERS } from "./controller/controllers";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from './common/auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { ControllerModule } from "./controller/controller.module";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [...ENTITIES],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ControllerModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
