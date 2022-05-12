import { Injectable } from "@nestjs/common";
import { CreateUserDto, DeleteToleDto, LoginUserDto } from "../../common/model/user/request-dto";
import { UserRepository } from "../../repository/user/user.repository";
import { v4 } from "uuid";
import { RoleRepository } from "../../repository/role/role.repository";
import * as bcrypt from 'bcrypt'
import { UserEntity } from "../../common/entity/user-entity";
import { sendMailerService } from "./send-mailer.service";



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
      confirm: false,
      confirmKey: v4()
    };
    const user = await this.userRepository.save(newUser)
    const confirmKey = user.id + '_' + user.confirmKey
    await sendMailerService(user.email, confirmKey)
  }

  async deleteRole(deleteToleDto: DeleteToleDto){
    const role = await this.roleRepository.findOne({ where: { role: deleteToleDto.roleName } });
    await this.userRepository.removeRole(deleteToleDto.userId, role.id)
    return 'success'

  }
  async getUser(id:number){
    return this.userRepository.findOne(id, {relations: ['roles']})
  }

  async confirmEmail (token:string) {
    const id = Number(token.split('_')[0])
    await this.userRepository.update(id, {confirm: true})
  }
}
