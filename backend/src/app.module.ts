import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { EmployeModule } from './employe/employe.module';
import { CommandeModule } from './commande/commande.module';
import { RestaurentModule } from './restaurent/restaurent.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [ClientModule, EmployeModule, CommandeModule, RestaurentModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
