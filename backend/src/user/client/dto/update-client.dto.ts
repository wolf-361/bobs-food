import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsCreditCard, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @ApiProperty({ example: 'John Doe', description: 'The name of the client on the credit card' })
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    titulaireCarteCredit: string;

    @ApiProperty({ example: '1234 5678 9123 4567', description: 'The credit card number' })
    @IsNotEmpty()
    @IsCreditCard()
    numeroCarteCredit: string;

    @ApiProperty({ example: '12/23', description: 'The expiration date of the credit card' })
    @IsNotEmpty()
    dateExpirationCarteCredit: string;

    @ApiProperty({ example: '123', description: 'The CVC of the credit card' })
    @IsNotEmpty()
    @IsString()
    @IsNumberString()
    cvcCarteCredit: string;
}
