import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

require('dotenv').config();


@Module({
  providers: [ConfigService]
})
export class ConfigModule {
}
