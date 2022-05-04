import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImagesColumnAndMainImageColumn1651676106518 implements MigrationInterface {
    name = 'AddImagesColumnAndMainImageColumn1651676106518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "images" text array`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "mainImage" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "mainImage"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "images"`);
    }

}
