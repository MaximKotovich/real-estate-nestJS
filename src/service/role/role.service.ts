import { Injectable } from "@nestjs/common";
import { RoleRepository } from "../../repository/role/role.repository";
import { addingRoleDto, CreateRoleDto } from "../../common/model/role/request-dto";
import { UserRepository } from "../../repository/user/user.repository";


@Injectable()
export class RoleService {
  constructor(
    private roleRepository:RoleRepository,
    private userRepository:UserRepository
  ) {
  }

  async createRole(createRoleDTO:CreateRoleDto){
      return this.roleRepository.save(createRoleDTO)
  }


  async addingRole(addingRole:addingRoleDto){
    const role = await this.roleRepository.findOne({ where: { role: addingRole.role } })

   await this.userRepository.addingRole(addingRole.userId, role.id)
  }
}
