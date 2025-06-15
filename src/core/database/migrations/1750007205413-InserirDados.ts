import { MigrationInterface, QueryRunner } from "typeorm";

export class InserirDados1750007205413 implements MigrationInterface {
    name = 'InserirDados1750007205413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO colaborador_entity (
                matricula, nome, email, cpf, cargo, setor, lideranca, nome_lideranca, data_cadastro, senha, salt, permissao, status_uso
            )
            VALUES (
                '0001',
                'Admin',
                'admin@epimanager.com.br',
                '123.456.789-00',
                'Administrador Geral',
                'TI',
                true,
                'Diretoria TI',
                NOW(), 
                '$2b$10$EG4blFIjFI/lnUTzrR9EtO.yVz0u9DcsIQaEkbHIl3iiR5RUZbbw6',
                '',
                'ADMIN',
                'ATIVO'
            );

        `);

        await queryRunner.query(`
            INSERT INTO equipamento_entity (descricao, preco, qtd, ca, data_validade, status_uso, foto)
            VALUES 
            ('Capacete de Segurança A', 120.50, 50, '12345-AB', '2026-05-30', 'ATIVO', 'https://via.placeholder.com/150?text=Capacete'),
            ('Luvas de Proteção Nitrílicas', 25.80, 200, '67890-CD', '2027-11-15', 'ATIVO', 'https://via.placeholder.com/150?text=Luvas'),
            ('Óculos de Segurança Universal', 45.00, 150, '11223-EF', '2028-03-10', 'ATIVO', 'https://via.placeholder.com/150?text=Oculos'),
            ('Máscara Respiratória PFF2', 78.90, 120, '33445-GH', '2026-12-01', 'ATIVO', 'https://via.placeholder.com/150?text=Mascara'),
            ('Protetor Auricular de Concha', 30.25, 300, '55667-IJ', '2029-08-22', 'ATIVO', 'https://via.placeholder.com/150?text=Protetor'),
            ('Bota de Segurança Cano Médio', 220.00, 80, '77889-KL', '2030-02-14', 'ATIVO', 'https://via.placeholder.com/150?text=Bota'),
            ('Colete Refletivo Laranja', 55.75, 180, '99001-MN', '2027-06-18', 'ATIVO', 'https://via.placeholder.com/150?text=Colete'),
            ('Cinto de Segurança para Trabalho em Altura', 150.40, 60, '22334-OP', '2028-09-05', 'ATIVO', 'https://via.placeholder.com/150?text=Cinto'),
            ('Avental de Raspa', 65.99, 100, '44556-QR', '2029-01-30', 'ATIVO', 'https://via.placeholder.com/150?text=Avental'),
            ('Capacete com Jugular e Forração', 160.20, 40, '66778-ST', '2026-04-12', 'ATIVO', 'https://via.placeholder.com/150?text=Capacete+2');

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
