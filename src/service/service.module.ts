import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ENTITIES } from "../common/entity/entities";
import { SERVICES } from "./services";
import { REPOSITORY } from "../repository/repository";


@Module({
  imports: [TypeOrmModule.forFeature([
    ...REPOSITORY,
    ...ENTITIES
  ])],
  providers: [...SERVICES],
  exports: [...SERVICES]
})
export class ServiceModule {}
