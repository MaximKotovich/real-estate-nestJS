import { EntityRepository, Repository } from "typeorm";
import { TownEntity } from "../../common/entity/town-entity";

@EntityRepository(TownEntity)
export class TownRepository extends Repository<TownEntity> {
}
