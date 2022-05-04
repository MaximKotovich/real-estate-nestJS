import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveLocationEntity1651651661324 implements MigrationInterface {
    name = 'RemoveLocationEntity1651651661324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_619a8f706df205d17e0f4da8b72"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "REL_619a8f706df205d17e0f4da8b7"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "locationId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "locationId" integer`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "REL_619a8f706df205d17e0f4da8b7" UNIQUE ("locationId")`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_619a8f706df205d17e0f4da8b72" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
