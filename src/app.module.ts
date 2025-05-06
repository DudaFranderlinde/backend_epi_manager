import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { databaseProviders } from './core/database/database.providers';
import { ColaboradoresModule } from './colaboradores/colaborador.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '6h',
      },
    }),
    ColaboradoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
