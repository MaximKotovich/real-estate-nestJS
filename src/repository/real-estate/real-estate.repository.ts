import { EntityRepository, Repository } from "typeorm";
import { RealEstateEntity } from "../../common/entity/real-estate-entity";

@EntityRepository(RealEstateEntity)
export class RealEstateRepository extends Repository<RealEstateEntity> {
}
