import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
