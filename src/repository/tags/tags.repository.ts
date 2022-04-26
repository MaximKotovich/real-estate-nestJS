import { EntityRepository, Repository } from "typeorm";
import { TagsEntity } from "../../common/entity/tags-entity";

@EntityRepository(TagsEntity)
export class TagsRepository extends Repository<TagsEntity> {
}
