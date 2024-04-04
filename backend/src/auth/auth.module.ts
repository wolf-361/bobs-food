import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';

@Module({
    imports: [  
        JwtModule.register(configService.jwtConfig),
    ],
    providers: [
        AuthService
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {}
