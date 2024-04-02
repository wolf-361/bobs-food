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
            'POSTGRES_DATABASE',
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
            database: env.POSTGRES_DATABASE,
            synchronize: DB_SYNC === 'true' ? true : false,
            logging: this.DB_LOGGING,
            // For Vercel
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: false
                }
            }
        };
    }

}

export const configService = new ConfigService(); 