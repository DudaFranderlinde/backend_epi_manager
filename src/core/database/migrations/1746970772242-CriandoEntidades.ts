import { MigrationInterface, QueryRunner } from "typeorm";

export class CriandoEntidades1746970772242 implements MigrationInterface {
    name = 'CriandoEntidades1746970772242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS equipamento_entity_codigo_seq START 4550000`);
        await queryRunner.query(`CREATE TABLE "estoque" ("id" SERIAL NOT NULL, "qtd" integer NOT NULL, "estoqueMinimo" integer NOT NULL, "equipamentoId" integer, CONSTRAINT "PK_261e2d9d708b7e0ca5dd8340bc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "colaborador_entity" ("id" SERIAL NOT NULL, "matricula" character varying NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "cargo" character varying NOT NULL, "setor" character varying NOT NULL, "lideranca" boolean NOT NULL DEFAULT false, "nome_lideranca" character varying NOT NULL, "senha" character varying NOT NULL, "salt" character varying NOT NULL, "permissao" "public"."colaborador_entity_permissao_enum" NOT NULL DEFAULT 'COLABORADOR', CONSTRAINT "UQ_69fe679a83ba7270ae2d3f62f83" UNIQUE ("matricula"), CONSTRAINT "PK_874acf118997ba280568b184d22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solicitacao_entity" ("id" SERIAL NOT NULL, "codigo" character varying NOT NULL, "qtd" integer NOT NULL, "dataAbertura" TIMESTAMP NOT NULL, "dataConclusao" TIMESTAMP, "entrega" boolean NOT NULL DEFAULT false, "status" "public"."solicitacao_entity_status_enum" NOT NULL, "urgencia" "public"."solicitacao_entity_urgencia_enum" NOT NULL, "equipamentoId" integer, "colaboradorId" integer, CONSTRAINT "PK_e09170b98aa5e864e3266fca63d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipamento_entity" ("id" SERIAL NOT NULL, "codigo" integer DEFAULT nextval('equipamento_entity_codigo_seq'), "descricao" character varying NOT NULL, "preco" numeric NOT NULL, "dataValidade" TIMESTAMP, "ca" character varying, CONSTRAINT "PK_128ecc24d97a091a8af3a9dc52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "historico_entrada_saida" ("id" SERIAL NOT NULL, "entrada" integer NOT NULL, "saida" integer NOT NULL, "estoqueFinal" integer NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, "equipamentoId" integer, CONSTRAINT "PK_22e89ba07710f7053fa3fbd7da4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "estoque" ADD CONSTRAINT "FK_f831d1785adf90f53c9080e1bcc" FOREIGN KEY ("equipamentoId") REFERENCES "equipamento_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" ADD CONSTRAINT "FK_0046a2db02858c78e3682a1c8a0" FOREIGN KEY ("equipamentoId") REFERENCES "equipamento_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" ADD CONSTRAINT "FK_47594f2e38eadc9ab96088f16e4" FOREIGN KEY ("colaboradorId") REFERENCES "colaborador_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "historico_entrada_saida" ADD CONSTRAINT "FK_1c166f6ac6f602a67be2f2eaca6" FOREIGN KEY ("equipamentoId") REFERENCES "equipamento_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE equipamento_entity ALTER COLUMN codigo SET DEFAULT nextval('equipamento_entity_codigo_seq')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "historico_entrada_saida" DROP CONSTRAINT "FK_1c166f6ac6f602a67be2f2eaca6"`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" DROP CONSTRAINT "FK_47594f2e38eadc9ab96088f16e4"`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" DROP CONSTRAINT "FK_0046a2db02858c78e3682a1c8a0"`);
        await queryRunner.query(`ALTER TABLE "estoque" DROP CONSTRAINT "FK_f831d1785adf90f53c9080e1bcc"`);
        await queryRunner.query(`DROP TABLE "historico_entrada_saida"`);
        await queryRunner.query(`DROP TABLE "equipamento_entity"`);
        await queryRunner.query(`DROP TABLE "solicitacao_entity"`);
        await queryRunner.query(`DROP TABLE "colaborador_entity"`);
        await queryRunner.query(`DROP TABLE "estoque"`);
    }

}
