import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ENTITIES } from "./common/entity/entities";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ControllerModule } from "./controller/controller.module";
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: parseInt(configService.get('DATABASE_PORT'), 10),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          entities: [...ENTITIES],
          synchronize: false,
        };
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('src/common/images', 'permanent'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ControllerModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
