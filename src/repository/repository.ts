import { UserRepository } from "./user/user.repository";
import { TagsRepository } from "./tags/tags.repository";
import { RoleRepository } from "./role/role.repository";
import { RealEstateRepository } from "./real-estate/real-estate.repository";
import { LocationRepository } from "./location/location.repository";
import { BookingRepository } from "./booking/booking.repository";

export const REPOSITORY = [
  UserRepository,
  TagsRepository,
  RoleRepository,
  RealEstateRepository,
  LocationRepository,
  BookingRepository
]
