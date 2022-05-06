import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveRealEstateColumnInTagsEntity1651827976809 implements MigrationInterface {
    name = 'RemoveRealEstateColumnInTagsEntity1651827976809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_f3278fa114f16c0bde2d6695f37"`);
        await queryRunner.query(`CREATE TABLE "real_estate_tags_tags" ("realEstateId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_f0be7d47f07df3cf295e88de021" PRIMARY KEY ("realEstateId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_19db6c38ff4a361b445e0d1734" ON "real_estate_tags_tags" ("realEstateId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3a85053a277ab443fa33924396" ON "real_estate_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "realEstateId"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_44ae17efa35575b6a6f83b35ee5"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_44ae17efa35575b6a6f83b35ee5" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "real_estate_tags_tags" ADD CONSTRAINT "FK_19db6c38ff4a361b445e0d17345" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "real_estate_tags_tags" ADD CONSTRAINT "FK_3a85053a277ab443fa339243965" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate_tags_tags" DROP CONSTRAINT "FK_3a85053a277ab443fa339243965"`);
        await queryRunner.query(`ALTER TABLE "real_estate_tags_tags" DROP CONSTRAINT "FK_19db6c38ff4a361b445e0d17345"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_44ae17efa35575b6a6f83b35ee5"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_44ae17efa35575b6a6f83b35ee5" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "realEstateId" integer`);
        await queryRunner.query(`DROP INDEX "IDX_3a85053a277ab443fa33924396"`);
        await queryRunner.query(`DROP INDEX "IDX_19db6c38ff4a361b445e0d1734"`);
        await queryRunner.query(`DROP TABLE "real_estate_tags_tags"`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_f3278fa114f16c0bde2d6695f37" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
