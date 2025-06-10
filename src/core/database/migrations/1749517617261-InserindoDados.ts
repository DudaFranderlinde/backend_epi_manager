import { MigrationInterface, QueryRunner } from "typeorm";

export class InserindoDados1749517617261 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO colaborador_entity (
                matricula, nome, cpf, cargo, setor, lideranca, nome_lideranca,
                senha, salt, permissao, status_uso
            ) VALUES (
                '0001', 'Admin Sistema', '000.000.000-00', 'Administrador', 'TI', true, 'N/A',
                '$2b$10$EG4blFIjFI/lnUTzrR9EtO.yVz0u9DcsIQaEkbHIl3iiR5RUZbbw6', '', 'ADMIN', 'ATIVO'
            )
            `);

        await queryRunner.query(`
            INSERT INTO equipamento_entity (descricao, preco, qtd, ca, data_validade, status_uso) VALUES
            ('Capacete de Segurança', 35.00, 150, 'CA10001', '2026-12-31', 'ATIVO'),
            ('Luvas de Borracha', 8.50, 300, 'CA10002', '2026-11-30', 'ATIVO'),
            ('Botina de Segurança', 120.00, 100, 'CA10003', '2027-01-15', 'ATIVO'),
            ('Óculos de Proteção', 20.00, 200, 'CA10004', '2026-10-01', 'ATIVO'),
            ('Protetor Auricular', 5.00, 500, 'CA10005', '2026-09-15', 'ATIVO'),
            ('Máscara Respiratória PFF2', 12.00, 250, 'CA10006', '2026-08-20', 'ATIVO'),
            ('Avental de PVC', 45.00, 80, 'CA10007', '2027-03-10', 'ATIVO'),
            ('Mangote de Raspa', 25.00, 120, 'CA10008', '2026-12-05', 'ATIVO'),
            ('Cinturão de Segurança', 180.00, 60, 'CA10009', '2027-05-01', 'ATIVO'),
            ('Blusão Antichama', 150.00, 90, 'CA10010', '2026-11-11', 'ATIVO')
            `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
