import { Injectable } from "@nestjs/common";
import { CreateUserDto, DeleteToleDto, LoginUserDto } from "../../common/model/user/request-dto";
import { UserRepository } from "../../repository/user/user.repository";
import { v4 } from "uuid";
import { RoleRepository } from "../../repository/role/role.repository";
import * as bcrypt from 'bcrypt'
import { UserEntity } from "../../common/entity/user-entity";



@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository
  ) {
  }

  async findOne (name: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ name }, {relations:['roles']})
  }

  async checkUsername (name: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ name })
  }

  async registration(createUserDto: CreateUserDto) {
    const role = await this.roleRepository.findOne({ where: { role: "user" } });
    const newUser = {
      ...createUserDto,
      pass: await bcrypt.hash(createUserDto.pass, 12),
      roles: [{id: role.id}],
      confirm: true,
      confirmKey: v4()
    };
    return await this.userRepository.save(newUser)
  }

  async deleteRole(deleteToleDto: DeleteToleDto){
    // const user = await this.userRepository.findOne(deleteToleDto.userId , {relations:['roles']})
    // user.roles = user.roles.filter((el) => el.role !== deleteToleDto.roleName)
    const role = await this.roleRepository.findOne({ where: { role: deleteToleDto.roleName } });
    await this.userRepository.removeRole(deleteToleDto.userId, role.id)
    return 'success'
    // return await this.userRepository.update(user.id,{roles: user.roles})

  }
  async getUser(id:number){
    return this.userRepository.findOne(id, {relations: ['roles']})
  }
}
