import { UserRepository } from "./user/user.repository";
import { TagsRepository } from "./tags/tags.repository";
import { RoleRepository } from "./role/role.repository";
import { RealEstateRepository } from "./real-estate/real-estate.repository";
import { BookingRepository } from "./booking/booking.repository";
import { AddressRepository } from "./location/address.repository";
import { CountryRepository } from "./location/country-repository";
import { TownRepository } from "./location/town-repository";

export const REPOSITORY = [
  UserRepository,
  TagsRepository,
  RoleRepository,
  RealEstateRepository,
  BookingRepository,
  AddressRepository,
  CountryRepository,
  TownRepository
];
