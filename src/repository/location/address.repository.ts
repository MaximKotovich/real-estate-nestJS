import { EntityRepository, Repository } from "typeorm";
import { AddressEntity } from "../../common/entity/address-entity";

@EntityRepository(AddressEntity)
export class AddressRepository extends Repository<AddressEntity> {
}
