import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor() {}
}
