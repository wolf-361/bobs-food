import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class EmployeLoginDto {
    @ApiProperty({ example: 'TESS0001', description: 'The id of the employe' })
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    employeId: string;

    @ApiProperty({ example: 'S0meP4ssword', description: 'The password of the client' })
    @IsNotEmpty()
    @IsString()
    password: string;
}