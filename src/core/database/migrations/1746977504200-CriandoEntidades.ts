import { MigrationInterface, QueryRunner } from "typeorm";

export class CriandoEntidades1746977504200 implements MigrationInterface {
    name = 'CriandoEntidades1746977504200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS equipamento_entity_codigo_seq START 4550000`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS solicitacao_entity_codigo_seq START 1`);
        await queryRunner.query(`CREATE TABLE "colaborador_entity" ("id" SERIAL NOT NULL, "matricula" character varying NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "cargo" character varying NOT NULL, "setor" character varying NOT NULL, "lideranca" boolean NOT NULL DEFAULT false, "nome_lideranca" character varying NOT NULL, "senha" character varying NOT NULL, "salt" character varying NOT NULL, "permissao" "public"."colaborador_entity_permissao_enum" NOT NULL DEFAULT 'COLABORADOR', CONSTRAINT "UQ_69fe679a83ba7270ae2d3f62f83" UNIQUE ("matricula"), CONSTRAINT "PK_874acf118997ba280568b184d22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "estoque" ("id" SERIAL NOT NULL, "qtd" integer NOT NULL, "estoqueMinimo" integer NOT NULL, "equipamentoId" integer, CONSTRAINT "PK_261e2d9d708b7e0ca5dd8340bc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "historico_entrada_saida" ("id" SERIAL NOT NULL, "entrada" integer NOT NULL, "saida" integer NOT NULL, "estoqueFinal" integer NOT NULL, "dataAtualizacao" TIMESTAMP NOT NULL, "equipamentoId" integer, CONSTRAINT "PK_22e89ba07710f7053fa3fbd7da4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipamento_entity" ("id" SERIAL NOT NULL, "codigo" integer DEFAULT nextval('equipamento_entity_codigo_seq'), "descricao" character varying NOT NULL, "preco" numeric NOT NULL, "dataValidade" TIMESTAMP, "ca" character varying, CONSTRAINT "PK_128ecc24d97a091a8af3a9dc52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solicitacao_entity" ("id" SERIAL NOT NULL, "codigo" character varying DEFAULT nextval('solicitacao_entity_codigo_seq'), "qtd" integer NOT NULL, "dataAbertura" TIMESTAMP NOT NULL, "dataConclusao" TIMESTAMP, "entrega" boolean DEFAULT false, "status" "public"."solicitacao_entity_status_enum", "urgencia" "public"."solicitacao_entity_urgencia_enum" NOT NULL, "equipamentoId" integer, "solicitanteId" integer, "responsavelEpiId" integer, CONSTRAINT "UQ_e7a33c0332ff3780583be806036" UNIQUE ("codigo"), CONSTRAINT "PK_e09170b98aa5e864e3266fca63d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "estoque" ADD CONSTRAINT "FK_f831d1785adf90f53c9080e1bcc" FOREIGN KEY ("equipamentoId") REFERENCES "equipamento_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "historico_entrada_saida" ADD CONSTRAINT "FK_1c166f6ac6f602a67be2f2eaca6" FOREIGN KEY ("equipamentoId") REFERENCES "equipamento_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" ADD CONSTRAINT "FK_0046a2db02858c78e3682a1c8a0" FOREIGN KEY ("equipamentoId") REFERENCES "equipamento_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" ADD CONSTRAINT "FK_6e494372a5c09a5c8d1aeea08ba" FOREIGN KEY ("solicitanteId") REFERENCES "colaborador_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" ADD CONSTRAINT "FK_d33917e5893a8c36affc85730a0" FOREIGN KEY ("responsavelEpiId") REFERENCES "colaborador_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION generate_solicitacao_codigo()
            RETURNS trigger AS $$
            DECLARE
                seq_number INTEGER;
            BEGIN
                IF NEW.codigo IS NULL THEN
                seq_number := nextval('solicitacao_codigo_seq');
                NEW.codigo := 'SOL-EPI-' || LPAD(seq_number::text, 4, '0');
                END IF;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);
        await queryRunner.query(`
            CREATE TRIGGER trigger_generate_solicitacao_codigo
            BEFORE INSERT ON solicitacao_entity
            FOR EACH ROW
            EXECUTE FUNCTION generate_solicitacao_codigo()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_generate_solicitacao_codigo ON solicitacao_entity`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS generate_solicitacao_codigo`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" DROP CONSTRAINT "FK_d33917e5893a8c36affc85730a0"`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" DROP CONSTRAINT "FK_6e494372a5c09a5c8d1aeea08ba"`);
        await queryRunner.query(`ALTER TABLE "solicitacao_entity" DROP CONSTRAINT "FK_0046a2db02858c78e3682a1c8a0"`);
        await queryRunner.query(`ALTER TABLE "historico_entrada_saida" DROP CONSTRAINT "FK_1c166f6ac6f602a67be2f2eaca6"`);
        await queryRunner.query(`ALTER TABLE "estoque" DROP CONSTRAINT "FK_f831d1785adf90f53c9080e1bcc"`);
        await queryRunner.query(`DROP TABLE "solicitacao_entity"`);
        await queryRunner.query(`DROP TABLE "equipamento_entity"`);
        await queryRunner.query(`DROP TABLE "historico_entrada_saida"`);
        await queryRunner.query(`DROP TABLE "estoque"`);
        await queryRunner.query(`DROP TABLE "colaborador_entity"`);
    }

}
