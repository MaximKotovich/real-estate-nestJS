import { EntityRepository, Repository } from "typeorm";
import { CountryEntity } from "../../common/entity/country-entity";

@EntityRepository(CountryEntity)
export class CountryRepository extends Repository<CountryEntity> {
}
