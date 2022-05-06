import { Injectable } from "@nestjs/common";
import { CreateTagDto } from "../../common/model/tags/request-dto";
import { TagsRepository } from "../../repository/tags/tags.repository";
import { TagDto } from "../../common/model/tags/response-dto";


@Injectable()
export class TagsService {
  constructor(
    private tagsRepository:TagsRepository
  ) {
  }

  async createTag(createTagDto: CreateTagDto):Promise<TagDto> {
    if(await this.tagsRepository.findOne({where: {tag: createTagDto.tag}}))
    {
      return
    }
     return await this.tagsRepository.save(createTagDto)
  }

  async removeTag(id: number){
      await this.tagsRepository.delete(id)
      return 'success'
  }
}
