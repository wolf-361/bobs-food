import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commande]),
    UserModule
  ],
  controllers: [CommandeController],
  providers: [CommandeService],
  exports: [CommandeService]
})
export class CommandeModule {}
