import { UserController } from "./user/user.controller";
import { TagsController } from "./tags/tags.controller";
import { RoleController } from "./role/role.controller";
import { RealEstateController } from "./real-estate/real-estate.controller";
import { LocationController } from "./location/location.controller";
import { BookingController } from "./booking/booking.controller";

export const CONTROLLERS = [
  UserController,
  TagsController,
  RoleController,
  RealEstateController,
  LocationController,
  BookingController
]
