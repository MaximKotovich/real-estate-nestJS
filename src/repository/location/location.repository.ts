import { EntityRepository, Repository } from "typeorm";
import { LocationEntity } from "../../common/entity/location-entity";

@EntityRepository(LocationEntity)
export class LocationRepository extends Repository<LocationEntity> {
}
