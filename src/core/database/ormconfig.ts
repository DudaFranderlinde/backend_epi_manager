/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    __dirname + '/../../**/**/*.entity{.ts,.js}', // As entidades serão buscadas em todas as pastas e precisa existir .entity no nome do arquivo.
    'dist/**/**/*.entity.js', // Corrigindo possível problema de importação da Entity.
  ],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'dist/core/database/migrations/*.js'
      : 'src/core/database/migrations/*.ts',
  ],
  synchronize: false, //Essa propriedade não deve ser utilizada em produção! Caso contrário os dados poderão ser perdidos.
  migrationsRun: false,
  migrationsTableName: 'history',
});