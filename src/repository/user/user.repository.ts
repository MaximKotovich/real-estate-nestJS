import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../../common/entity/user-entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  addingRole = (userId, roleId) => {
    return this
      .createQueryBuilder()
      .insert()
      .into("user_roles_role")
      .values([
        {
          userId: userId,
          roleId: roleId
        }
      ])
      .execute();
  };


  removeRole = (userId, roleId) => {
    return this
      .createQueryBuilder()
      .delete()
      .from("user_roles_role")
      .where("userId = :userId AND roleId = :roleId",
        { userId, roleId })
      .execute();
  };


}
