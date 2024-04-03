import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'process';

@Injectable()
export class ConfigService {
    /**
       * Ensure that all required environment variables are set
       * @param key The key of the environment variable
       * @returns The value of the environment variable
       */
    private ensureValues(keys: string[]) {
        keys.forEach(k => {
            if (!env[k]) {
                throw new Error(`Environment variable ${k} is not defined.`);
            }
        });
    }

    public get mode(): string {
        return env.MODE || 'dev';
    }

    /**
     * Check if the application is in development mode
     * @returns true if the application is in development mode
     */
    public isDev(): boolean {
        return this.mode === 'dev';
    }


    public get DB_LOGGING(): boolean {
        // Default value is false
        const DB_LOGGING = env.DB_LOGGING || 'false';
        return DB_LOGGING === 'true' ? true : false;
    }

    /**
    * Get's the proper config for the TypeORM library from environment variables
    * @returns The config for the TypeORM library
    */
    public get typeOrmConfig(): TypeOrmModuleOptions {
        // Could ensure that all required environment variables are set here
        this.ensureValues([
            'POSTGRES_HOST',
            'POSTGRES_PASSWORD',
            'POSTGRES_USER',
            'POSTGRES_DB',
        ]);

        // Sync defaults to false
        const DB_SYNC = env.DB_SYNC || 'false';

        return {
            type: 'postgres',
            host: env.POSTGRES_HOST,
            port: parseInt(env.DB_PORT, 10) || 5432,
            password: env.POSTGRES_PASSWORD,
            username: env.POSTGRES_USER,
            entities: [

            ],
            database: env.POSTGRES_DB,
            synchronize: DB_SYNC === 'true' ? true : false,
            logging: this.DB_LOGGING,
            // For Vercel
            ssl: this.isDev() ? false : { rejectUnauthorized: false }
        };
    }

    // Jwt methods

    /**
     * Get's the proper config for the JWT library from environment variables
     * @returns The config for the JWT library
     */
    public get jwtConfig(): { global: boolean, secret: string, signOptions: { expiresIn: string } } {
        return {
            global: true,
            secret: this.jwtSecret,
            signOptions: { expiresIn: this.jwtExpirationTimeString },
        };
    }

    private get jwtExpirationTimeString(): string {
        this.ensureValues([
            'JWT_EXPIRATION_TIME'
        ]);

        return env.JWT_EXPIRATION_TIME;
    }

    public get jwtExpirationTime(): number {
        this.ensureValues([
            'JWT_EXPIRATION_TIME'
        ]);

        // Convert the string from h, m or s to s
        const time = env.JWT_EXPIRATION_TIME;
        const unit = time[time.length - 1];
        const value = parseInt(time.slice(0, time.length - 1), 10);
        switch (unit) {
            case 'h':
                return value * 60 * 60;
            case 'm':
                return value * 60;
            case 's':
                return value;
            default:
                throw new Error(`Invalid unit ${unit}`);
        }
    }

    public get jwtSecret(): string {
        this.ensureValues([
            'JWT_SECRET'
        ]);

        return env.JWT_SECRET;
    }

}

export const configService = new ConfigService(); 