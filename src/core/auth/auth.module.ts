import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { ColaboradorService } from 'src/colaboradores/colaborador.service';
import { databaseProviders } from '../database/database.providers';
import { colaboradorProviders } from 'src/colaboradores/colaborador.providers';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '6h',
      },
    }),

  ],
  providers: [AuthService, ColaboradorService, ...databaseProviders, ...colaboradorProviders],
})
export class AuthModule {}