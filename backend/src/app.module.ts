import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandeModule } from './commande/commande.module';
import { RestaurentModule } from './restaurent/restaurent.module';
import { ItemModule } from './item/item.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RoleGuard } from './guards/role/role.guard';
import { AuthModule } from './auth/auth.module';
import { InitService } from './init/init.service';

@Module({
  imports: [ 
    ConfigModule,
    TypeOrmModule.forRoot(configService.typeOrmConfig),
    CommandeModule, 
    RestaurentModule, 
    ItemModule, 
    UserModule, 
    AuthModule, 
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: RoleGuard
    },
    InitService
  ],
})
export class AppModule {}
