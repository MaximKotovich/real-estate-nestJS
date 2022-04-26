import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from "./common/entity/entities";
import { REPOSITORY } from "./repository/repository";
import { SERVICES } from "./service/services";
import { CONTROLLERS } from "./controller/controllers";


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
    TypeOrmModule.forFeature([
      ...REPOSITORY
    ])
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class AppModule {}
