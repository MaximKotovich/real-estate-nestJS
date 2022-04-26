import {MigrationInterface, QueryRunner} from "typeorm";

export class InitEntity1650958990257 implements MigrationInterface {
    name = 'InitEntity1650958990257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surName" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "login" character varying NOT NULL, "pass" character varying NOT NULL, "confirm" boolean NOT NULL, "confirm_key" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "tag" character varying NOT NULL, "realEstateId" integer, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "real_estate" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "coast" character varying NOT NULL, "type" character varying NOT NULL, "area" integer NOT NULL, "images" character varying NOT NULL, "locationId" integer, "ownerId" integer, CONSTRAINT "REL_619a8f706df205d17e0f4da8b7" UNIQUE ("locationId"), CONSTRAINT "PK_8735a23fd5adc2afb18242894ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "dateStart" bigint, "dateEnd" bigint, "userId" integer, "realEstateId" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_f3278fa114f16c0bde2d6695f37" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_619a8f706df205d17e0f4da8b72" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_866f2c7cae363b2f45bf901209c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_f7860d9e712a2a2caffdf874a4d" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_f7860d9e712a2a2caffdf874a4d"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_866f2c7cae363b2f45bf901209c"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_619a8f706df205d17e0f4da8b72"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_f3278fa114f16c0bde2d6695f37"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "real_estate"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
