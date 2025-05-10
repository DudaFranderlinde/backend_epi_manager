import { IsEmail, IsString, MinLength } from "class-validator";

export class CredentialsDTO{
    @IsString()
    readonly matricula: string;

    @IsString()
    @MinLength(8)
    readonly password: string;
}