import { Module } from "@nestjs/common";
import { ColaboradoresController } from "./colaboradores.controller";
import { JwtModule } from "@nestjs/jwt";
import { databaseProviders } from "src/core/database/database.providers";
import { AuthService } from "src/core/auth/service/auth.service";

@Module({
    controllers: [ColaboradoresController],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '6h',
            },
        }),
    ],
    providers: [
        ...databaseProviders,
        ...colaboradorProviders,
        ColaboradoresService,
        AuthService,
    ],
});
export class ColaboradoresModule {}