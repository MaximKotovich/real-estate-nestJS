import { Injectable } from "@nestjs/common";
import { NewEstateDto, UpdateEstateDto } from "../../common/model/real-estate/request-dto";
import { UserRepository } from "../../repository/user/user.repository";
import { RealEstateRepository } from "../../repository/real-estate/real-estate.repository";
import { CountryRepository } from "../../repository/location/country-repository";
import { TownRepository } from "../../repository/location/town-repository";
import { AddressRepository } from "../../repository/location/address.repository";
import { GetOneEstateResponseDto } from "../../common/model/real-estate/response-dto";
import { ImagesService } from "../image/images.service";
import * as fs from "fs";
import * as path from "path";


@Injectable()
export class RealEstateService {
  constructor(
    private userRepository: UserRepository,
    private realEstateRepository: RealEstateRepository,
    private countryRepository: CountryRepository,
    private townRepository: TownRepository,
    private addressRepository: AddressRepository,
    private imagesService:ImagesService
  ) {
  }


  async createPost(newEstateDto: NewEstateDto, userId: number) {
    let country = await this.countryRepository.findOne({ where: { country: newEstateDto.country } });
    let town = await this.townRepository.findOne({ where: { town: newEstateDto.town } });
    if (!country) {
      country = await this.countryRepository.save({ country: newEstateDto.country });
    }
    if (!town) {
      town = await this.townRepository.save({ town: newEstateDto.town, country: { id: country.id } });
    }
    const address = await this.addressRepository.save({ address: newEstateDto.address, town: { id: town.id } });

    const realEstate = {
      name: newEstateDto.name,
      description: newEstateDto.description,
      coast: newEstateDto.coast,
      area: newEstateDto.area,
      type: newEstateDto.type,
      images: newEstateDto.images,
      mainImage: newEstateDto.mainImage,
      address: { id: address.id },
      owner: { id: userId }
    };


    // move images from temporary folder to permanent folder  //
    for (const image of newEstateDto.images){
      const oldPath = path.join(process.env.PATH_TO_TEMPORARY_IMAGES, image)
      const newPath = path.join(process.env.PATH_TO_PERMANENT_IMAGES, image)
      fs.renameSync(oldPath, newPath)
    }
    if (newEstateDto.mainImage) {
      const oldPath = path.join(process.env.PATH_TO_TEMPORARY_IMAGES, newEstateDto.mainImage)
      const newPath = path.join(process.env.PATH_TO_PERMANENT_IMAGES, newEstateDto.mainImage)
      fs.renameSync(oldPath, newPath)
    }
    //========================================================================================== //

    return await this.realEstateRepository.save(realEstate);
  }

  async patchEstate(updateEstateDto: UpdateEstateDto) {
      // Object.keys(updateEstateDto).
    return await this.realEstateRepository.update({ id: updateEstateDto.id }, {...updateEstateDto})

  }


  async findOne(id: number): Promise<GetOneEstateResponseDto> {
    const query = await this.realEstateRepository.createQueryBuilder("estate")
      .where("estate.id = :estateId", { estateId: id })
      .leftJoinAndSelect("estate.address", "address")
      .leftJoinAndSelect("address.town", "town")
      .leftJoinAndSelect("town.country", "country")
      .leftJoinAndSelect("estate.owner", "owner")
      .getOne();


    const realEstate = {
      id: query.id,
      name: query.name,
      description: query.description,
      coast: query.coast,
      type: query.type,
      area: query.area,
      images: query.images,
      mainImage: query.mainImage,
      location: {
        address: query.address.address,
        town: query.address.town.town,
        country: query.address.town.country.country
      },
      owner: query.owner
    };

    return realEstate
  }

  async uploadImage(image) {
      return this.imagesService.createFile(image)
  }
}
