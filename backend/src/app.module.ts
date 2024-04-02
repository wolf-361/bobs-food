import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './user/client/client.module';
import { EmployeModule } from './user/employe/employe.module';
import { CommandeModule } from './commande/commande.module';
import { RestaurentModule } from './restaurent/restaurent.module';
import { ItemModule } from './item/item.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

@Module({
  imports: [
    ClientModule, 
    EmployeModule, 
    CommandeModule, 
    RestaurentModule, 
    ItemModule, 
    ConfigModule,
    TypeOrmModule.forRoot(configService.typeOrmConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
