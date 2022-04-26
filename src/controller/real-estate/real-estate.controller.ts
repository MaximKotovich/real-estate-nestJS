import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";

@ApiTags('real-estate')
@Controller('real-estate')
export class RealEstateController {
  constructor() {
  }
}
