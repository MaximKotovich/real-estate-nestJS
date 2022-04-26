import { Injectable } from "@nestjs/common";
import { RoleRepository } from "../../repository/role/role.repository";
import { CreateRoleDto } from "../../common/model/role/request-dto";


@Injectable()
export class RoleService {
  constructor(
    private roleRepository:RoleRepository
  ) {
  }

  async createRole(createRoleDTO:CreateRoleDto){
      return this.roleRepository.save(createRoleDTO)
  }


}
