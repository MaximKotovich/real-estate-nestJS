import {MigrationInterface, QueryRunner} from "typeorm";

export class InitData1651741261350 implements MigrationInterface {
    name = 'InitData1651741261350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const countries = require('./init-data-json/COUNTRIES_201905081635').COUNTRIES.map(c => {
            return c;
        });
        const towns = require('./init-data-json/TOWNS_201905081635').TOWNS.map(t => {
            return t;
        });
        const addresses = require('./init-data-json/ADDRESS_201905081637').ADDRESS.map(a => {
            return a;
        });

        const rols = [{ role: "admin" }, { role: "user" }]

        await queryRunner.connection
          .createQueryBuilder()
          .insert()
          .into('country')
          .values(countries)
          .execute()

        await queryRunner.connection
          .createQueryBuilder()
          .insert()
          .into('town')
          .values(towns)
          .execute()

        await queryRunner.connection
          .createQueryBuilder()
          .insert()
          .into('address')
          .values(addresses)
          .execute()

        await queryRunner.connection
          .createQueryBuilder()
          .insert()
          .into('role')
          .values(rols)
          .execute()

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
