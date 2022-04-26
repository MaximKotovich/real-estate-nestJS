import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor() {
  }
}
