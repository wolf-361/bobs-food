import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeController } from './employe/employe.controller';
import { Employe } from './employe/entities/employe.entity';
import { EmployeService } from './employe/employe.service';
import { Client } from './client/entities/client.entity';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([Employe, Client]),
      AuthModule
    ],
    controllers: [EmployeController, ClientController],
    providers: [
      EmployeService, 
      ClientService
    ],
    exports: [
      EmployeService, 
      ClientService
    ]
  })
export class UserModule {}
