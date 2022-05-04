import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveImagesColumn1651647240226 implements MigrationInterface {
    name = 'RemoveImagesColumn1651647240226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "images"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "images" character varying NOT NULL`);
    }

}
