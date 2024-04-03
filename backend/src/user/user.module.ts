import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeController } from './employe/employe.controller';
import { Employe } from './employe/entities/employe.entity';
import { EmployeService } from './employe/employe.service';
import { Client } from './client/entities/client.entity';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { AuthService } from './auth/auth.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([Employe, Client]),
    ],
    controllers: [EmployeController, ClientController],
    providers: [EmployeService, ClientService, AuthService],
  })
export class UserModule {}
