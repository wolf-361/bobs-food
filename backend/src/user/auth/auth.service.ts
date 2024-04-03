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

    /**
     * Make salt
     * @returns a salt
     */
    public makeSalt(): string {
        return bcrypt.genSaltSync(this.saltRounds);
    }

    /**
     * Salt and hash the password
     * @param password The password to hash
     * @returns The salt and the hashed password
     */
    public hashPassword(password: string): { salt: string, hashedPassword: string } {
        const salt = this.makeSalt();
        return { salt: salt, hashedPassword: bcrypt.hashSync(password, salt) };
    }

    /**
     * Salt and hash the password with a given salt
     * @param password The password to hash
     * @param salt The salt to use
     * @returns The hashed password
     */
    public hashPasswordWithSalt(password: string, salt: string): string {
        return bcrypt.hashSync(password, salt);
    }

    /**
     * Compare a password with a hash
     * @param password The password to compare
     * @param hash The hashed password to compare
     * @returns True if the password is correct, false otherwise
     */
    public comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    /**
     * Generate a JWT token
     * @param user The user to generate the token for
     * @returns The token, the expiration time and the role of the user
     */
    public generateJwtToken(user: User | Error): { token: string, expiresIn: number, role: string} {
        if (user instanceof Error) {
            throw user;
        }

        if (!user) {
            throw new Error("User not found");
        }

        if (user instanceof Client) {
            return this.generateJwtTokenFromClient(user);
        }

        if (user instanceof Employe) {
            return this.generateJwtTokenFromEmploye(user);
        }

        throw new Error("User type not supported");
    }

    /**
     * Generate a JWT token from a client
     * @param client The client to generate the token for
     * @returns The token, the expiration time and the role of the user
     */
    private generateJwtTokenFromClient(client: Client): { token: string, expiresIn: number, role: string} {
        const payload = { nom: client.nom, role: "client", sub: client.courriel };
        return { token: this.jwtService.sign(payload), expiresIn: configService.jwtExpirationTime, role: "client" };
    }

    /**
     * Generate a JWT token from an employe
     * @param employe The employe to generate the token for
     * @returns The token, the expiration time and the role of the user
     */
    private generateJwtTokenFromEmploye(employe: Employe): { token: string, expiresIn: number, role: string} {
        const payload = { nom: employe.nom, role: employe.type, sub: employe.employeId };
        return { token: this.jwtService.sign(payload), expiresIn: configService.jwtExpirationTime, role: employe.type };
    }
}
