import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { databaseProviders } from './core/database/database.providers';
import { ColaboradoresModule } from './colaboradores/colaborador.module';
import { AuthModule } from './core/auth/auth.module';
import { JwtStrategy } from './core/auth/guard/jwt-strategy';
import { EquipamentoModule } from './equipamento/equipamento.module';

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
    ColaboradoresModule,
    AuthModule,
    EquipamentoModule
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
