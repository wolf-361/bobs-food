import { Injectable } from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { Employe } from './entities/employe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeService {
  constructor(
    @InjectRepository(Employe) private employeRepository: Repository<Employe>,
    private authService: AuthService
  ) {}

  create(createEmployeDto: CreateEmployeDto) {
    return 'This action adds a new employe';
  }

  findAll() {
    return `This action returns all employe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employe`;
  }

  update(id: number, updateEmployeDto: UpdateEmployeDto) {
    return `This action updates a #${id} employe`;
  }

  remove(id: number) {
    return `This action removes a #${id} employe`;
  }
}
