import { BookingService } from "./booking/booking.service";
import { LocationService } from "./location/location.service";
import { RealEstateService } from "./real-estate/real-estate.service";
import { RoleService } from "./role/role.service";
import { TagsService } from "./tags/tags.service";
import { UserService } from "./user/user.service";
import { AuthService } from "../common/auth/auth.service";
import { JwtService } from "@nestjs/jwt";

export const SERVICES = [
  BookingService,
  LocationService,
  RealEstateService,
  RoleService,
  TagsService,
  UserService
]
