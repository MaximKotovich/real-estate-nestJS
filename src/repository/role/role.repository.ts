import { EntityRepository, Repository } from "typeorm";
import { RoleEntity } from "../../common/entity/role-entity";

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {
}
