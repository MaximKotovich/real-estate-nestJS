import { BookingEntity } from "../../common/entity/booking-entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(BookingEntity)
export class BookingRepository extends Repository<BookingEntity> {
}
