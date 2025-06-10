import { MigrationInterface, QueryRunner } from "typeorm";

export class CriandoEntidades1749517232565 implements MigrationInterface {
    name = 'CriandoEntidades1749517232565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS equipamento_entity_codigo_seq START 4550000`);
        await queryRunner.query(`CREATE TYPE "public"."colaborador_entity_permissao_enum" AS ENUM('ADMIN', 'ALMOXARIFADO', 'COLABORADOR')`);
        await queryRunner.query(`CREATE TYPE "public"."colaborador_entity_status_uso_enum" AS ENUM('ATIVO', 'DESATIVADO')`);
        await queryRunner.query(`CREATE TABLE "colaborador_entity" ("id" SERIAL NOT NULL, "matricula" character varying NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "cargo" character varying NOT NULL, "setor" character varying NOT NULL, "lideranca" boolean NOT NULL DEFAULT false, "nome_lideranca" character varying NOT NULL, "senha" character varying NOT NULL, "salt" character varying NOT NULL, "permissao" "public"."colaborador_entity_permissao_enum" NOT NULL DEFAULT 'COLABORADOR', "status_uso" "public"."colaborador_entity_status_uso_enum" NOT NULL DEFAULT 'DESATIVADO', CONSTRAINT "UQ_69fe679a83ba7270ae2d3f62f83" UNIQUE ("matricula"), CONSTRAINT "PK_874acf118997ba280568b184d22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."equipamento_entity_status_uso_enum" AS ENUM('ATIVO', 'DESATIVADO')`);
        await queryRunner.query(`CREATE TABLE "equipamento_entity" ("id" SERIAL NOT NULL, "codigo" integer DEFAULT nextval('equipamento_entity_codigo_seq'), "descricao" character varying NOT NULL, "preco" numeric NOT NULL, "qtd" integer NOT NULL, "ca" character varying NOT NULL, "data_validade" character varying NOT NULL, "status_uso" "public"."equipamento_entity_status_uso_enum" NOT NULL DEFAULT 'DESATIVADO', CONSTRAINT "PK_128ecc24d97a091a8af3a9dc52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."solicitacao_entity_status_enum" AS ENUM('PENDENTE', 'APROVADA', 'ENTREGUE', 'REJEITADA')`);
        await queryRunner.query(`CREATE TYPE "public"."solicitacao_entity_urgencia_enum" AS ENUM('BAIXA', 'MEDIA', 'ALTA')`);
        await queryRunner.query(`CREATE TABLE "solicitacao_entity" ("id" SERIAL NOT NULL, "qtd" integer NOT NULL, "dataAbertura" TIMESTAMP NOT NULL, "dataConclusao" TIMESTAMP, "entrega" boolean DEFAULT false, "status" "public"."solicitacao_entity_status_enum" DEFAULT 'PENDENTE', "urgencia" "public"."solicitacao_entity_urgencia_enum" NOT NULL, "equipamentoId" integer, "solicitanteId" integer, "responsavelEpiId" integer, CONSTRAINT "PK_e09170b98aa5e864e3266fca63d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "historico_entrada_saida" ("id" SERIAL NOT NULL, "entrada" integer NOT NULL, "saida" integer NOT NULL, "estoqueFinal" integer NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_22e89ba07710f7053fa3fbd7da4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" ADD CONSTRAINT "FK_0046a2db02858c78e3682a1c8a0" FOREIGN KEY ("equipamentoId") REFERENCES "equipamento_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" ADD CONSTRAINT "FK_6e494372a5c09a5c8d1aeea08ba" FOREIGN KEY ("solicitanteId") REFERENCES "colaborador_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" ADD CONSTRAINT "FK_d33917e5893a8c36affc85730a0" FOREIGN KEY ("responsavelEpiId") REFERENCES "colaborador_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" DROP CONSTRAINT "FK_d33917e5893a8c36affc85730a0"`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" DROP CONSTRAINT "FK_6e494372a5c09a5c8d1aeea08ba"`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" DROP CONSTRAINT "FK_0046a2db02858c78e3682a1c8a0"`);
        await queryRunner.query(`DROP TABLE "historico_entrada_saida"`);
        await queryRunner.query(`DROP TABLE "solicitacao_entity"`);
        await queryRunner.query(`DROP TYPE "public"."solicitacao_entity_urgencia_enum"`);
        await queryRunner.query(`DROP TYPE "public"."solicitacao_entity_status_enum"`);
        await queryRunner.query(`DROP TABLE "equipamento_entity"`);
        await queryRunner.query(`DROP TYPE "public"."equipamento_entity_status_uso_enum"`);
        await queryRunner.query(`DROP TABLE "colaborador_entity"`);
        await queryRunner.query(`DROP TYPE "public"."colaborador_entity_status_uso_enum"`);
        await queryRunner.query(`DROP TYPE "public"."colaborador_entity_permissao_enum"`);
    }

}
