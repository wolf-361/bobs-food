import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user';
import { Client } from '../client/entities/client.entity';
import { Employe } from '../employe/entities/employe.entity';
import { configService } from 'src/config/config.service';

@Injectable()
export class AuthService {
    private readonly saltRounds = 10;

    constructor(
        private jwtService: JwtService,
    ) {}

    public makeSalt(): string {
        return bcrypt.genSaltSync(this.saltRounds);
    }

    public hashPassword(password: string, salt: string): string {
        return bcrypt.hashSync(password, salt);
    }

    public comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    public generateJwtToken(user: User | Error): { token: string, expiresIn: number, role: string} {
        if (user instanceof Error) {
            throw user;
        }
        const role = user instanceof Client ? "client" : user instanceof Employe ? user.type : "guest";

        const payload = { nom: user.nom, role: role, sub: user.id };
        return { token: this.jwtService.sign(payload), expiresIn: configService.jwtExpirationTime, role: role };
    }
}
