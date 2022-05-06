import { Injectable } from "@nestjs/common";
import {
  AddTagToRealEstateDto,
  NewEstateDto, RemoveTagFromEstateDto,
  SearchRealEstateDto,
  UpdateEstateDto
} from "../../common/model/real-estate/request-dto";
import { UserRepository } from "../../repository/user/user.repository";
import { RealEstateRepository } from "../../repository/real-estate/real-estate.repository";
import { AddressRepository } from "../../repository/location/address.repository";
import { GetOneEstateResponseDto } from "../../common/model/real-estate/response-dto";
import { ImagesService } from "../image/images.service";
import * as fs from "fs";
import * as path from "path";
import { Cron, CronExpression } from "@nestjs/schedule";
import { TagsRepository } from "../../repository/tags/tags.repository";


@Injectable()
export class RealEstateService {
  constructor(
    private userRepository: UserRepository,
    private realEstateRepository: RealEstateRepository,
    private addressRepository: AddressRepository,
    private tagsRepository:TagsRepository,
    private imagesService: ImagesService
  ) {
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  deleteTemporaryFiles() {
    const pathTo =  'src/common/images/temporary'
    fs.readdirSync(pathTo).map(file => {
      const statInDir = fs.statSync(pathTo + '/' + file)
      const date = new Date()
      if (statInDir.birthtimeMs < date.setMilliseconds(-3 * 60 * 60 * 1000)){
        fs.unlinkSync(pathTo + '/' + file)
      }
    })
  }

  moveImages (images: string[]) {
    for (const image of images) {
      const oldPath = path.join(process.env.PATH_TO_TEMPORARY_IMAGES, image);
      const newPath = path.join(process.env.PATH_TO_PERMANENT_IMAGES, image);
      fs.renameSync(oldPath, newPath);
    }
  }

  moveMainImage (image:string){
    const oldPath = path.join(process.env.PATH_TO_TEMPORARY_IMAGES, image);
    const newPath = path.join(process.env.PATH_TO_PERMANENT_IMAGES, image);
    fs.renameSync(oldPath, newPath);
  }

  async createPost(newEstateDto: NewEstateDto, userId: number) {
    const address = await this.addressRepository.findOne({ where: { address: newEstateDto.address } });

    const realEstate = {
      name: newEstateDto.name,
      description: newEstateDto.description,
      coast: newEstateDto.coast,
      area: newEstateDto.area,
      type: newEstateDto.type,
      images: newEstateDto.images ? newEstateDto.images : null,
      mainImage: newEstateDto.mainImage ? newEstateDto.mainImage : null,
      address: { id: address.id },
      owner: { id: userId }
    };


    // move images from temporary folder to permanent folder  //
    if (newEstateDto.images) {
      this.moveImages(newEstateDto.images)
    }
    if (newEstateDto.mainImage) {
      this.moveMainImage(newEstateDto.mainImage)
    }
    //========================================================================================== //

    return await this.realEstateRepository.save(realEstate);
  }

  async patchEstate(updateEstateDto: UpdateEstateDto) {
    const estate = await this.realEstateRepository.findOne(updateEstateDto.id)
    let updateBody = {}
    for (const key of Object.keys(updateEstateDto)) {
      if(key === 'id'){
        continue
      }
      if (key === 'address'){
        const address = await this.addressRepository.findOne({ where: { address: updateEstateDto.address } })
        updateBody[key] = { id: address.id }
        continue
      }

      if (key === 'images' && updateEstateDto[key]){
          this.moveImages(updateEstateDto[key])
        if (estate.images){
          updateBody[key] = [...estate.images, ...updateEstateDto[key]]
        }
        updateBody[key] = updateEstateDto[key]
        continue
      }
      if (key === 'mainImage' && updateEstateDto[key]){
        this.moveMainImage(updateEstateDto[key])
        updateBody[key] = updateEstateDto[key]
        continue
      }

      updateBody[key] = updateEstateDto[key]
    }

    await this.realEstateRepository.update({ id: updateEstateDto.id }, { ...updateBody });
    return 'success'
  }


  async advancedSearch ( searchRealEstateDto: SearchRealEstateDto) {
      const query = this.realEstateRepository
        .createQueryBuilder('estate')
        .leftJoinAndSelect('estate.owner', 'owner')
        .leftJoinAndSelect('estate.tags', 'tags')
        .leftJoinAndSelect('estate.address', 'address')
        .leftJoinAndSelect('address.town', 'town')
        .leftJoinAndSelect('town.country', 'country')

    Object.keys(searchRealEstateDto).forEach((key) => {
      if (key === 'startCoast'){
          query.andWhere('estate.coast >= :startCoast', {startCoast: searchRealEstateDto[key]})
        return
      }
      if (key === 'endCoast') {
        query.andWhere('estate.coast <= :endCoast', {endCoast: searchRealEstateDto[key]})
        return
      }

      if (key === 'type') {
        query.andWhere('estate.type = :type', {type: searchRealEstateDto[key]})
        return
      }
      if (key === 'address') {
        query.andWhere('address = :address', {address: searchRealEstateDto[key]})
        return
      }
      if (key === 'country') {
        query.andWhere('country = :country', {country: searchRealEstateDto[key]})
        return
      }
      if (key === 'town') {
        query.andWhere('town = :town', {town: searchRealEstateDto[key]})
        return
      }
      if (key === 'tag') {
        const subQuery = this.realEstateRepository.createQueryBuilder()
          .subQuery()
          .select('estates.id', 'estateId')
          .from('real_estate', 'estates')
          .leftJoin('estates.tags', 'tags')
          .where(`tags.id IN (${searchRealEstateDto[key]})`)
          .getQuery()

        query.andWhere('estate.id IN (' + subQuery + ')')
        return
      }
    })

    const searchResult = await query.getMany()
    const result = searchResult.map((el) => {
      return {
        id: el.id,
        name: el.name,
        description: el.description,
        coast: el.coast,
        type: el.type,
        area: el.area,
        images: el.images,
        tags: el.tags,
        mainImage: el.mainImage,
        location: {
          address: el.address.address,
          town: el.address.town.town,
          country: el.address.town.country.country
        },
        owner: el.owner
      }
    })
    return result
  }

  async addTagForRealEstate(addTagToRealEstateDto: AddTagToRealEstateDto) {
    const realEstate = await this.realEstateRepository.findOne(addTagToRealEstateDto.realEstateId, {relations: ['tags']})
    const tag = await this.tagsRepository.findOne(addTagToRealEstateDto.tagId)
    realEstate.tags = [...realEstate.tags, tag]
    await this.realEstateRepository.save(realEstate)
  }

  async removeTagForRealEstate(removeTagFromEstateDto:RemoveTagFromEstateDto) {
    const realEstate = await this.realEstateRepository.findOne(removeTagFromEstateDto.realEstateId, {relations: ['tags']})
    const tag = await this.tagsRepository.findOne(removeTagFromEstateDto.tagId)
    realEstate.tags = realEstate.tags.filter((el) => el.id !== tag.id)
    await this.realEstateRepository.save(realEstate)
  }

  async findOne(id: number): Promise<GetOneEstateResponseDto> {
    const query = await this.realEstateRepository.createQueryBuilder("estate")
      .where("estate.id = :estateId", { estateId: id })
      .leftJoinAndSelect("estate.address", "address")
      .leftJoinAndSelect("estate.tags", "tags")
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
      tags: query.tags,
      location: {
        address: query.address.address,
        town: query.address.town.town,
        country: query.address.town.country.country
      },
      owner: query.owner
    };

    return realEstate;
  }

  async uploadImage(image) {
    return this.imagesService.createFile(image);
  }
}
