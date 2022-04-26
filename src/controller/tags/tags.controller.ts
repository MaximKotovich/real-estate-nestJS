import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor() {
  }
}
