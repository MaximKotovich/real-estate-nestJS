import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTownCountryAddressEntities1651652339302 implements MigrationInterface {
    name = 'AddTownCountryAddressEntities1651652339302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "country" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "town" ("id" SERIAL NOT NULL, "town" character varying NOT NULL, "countryId" integer, CONSTRAINT "PK_983b203100527a0c323c5e3b106" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "townId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "town" ADD CONSTRAINT "FK_d0112d80a25dddc3ccfaf9682d1" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_b7b4c0f333b233a5e560c092f6e" FOREIGN KEY ("townId") REFERENCES "town"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_b7b4c0f333b233a5e560c092f6e"`);
        await queryRunner.query(`ALTER TABLE "town" DROP CONSTRAINT "FK_d0112d80a25dddc3ccfaf9682d1"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "town"`);
        await queryRunner.query(`DROP TABLE "country"`);
    }

}
