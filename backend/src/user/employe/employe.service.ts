import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { Employe } from './entities/employe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../../auth/auth.service';
import { Repository } from 'typeorm';
import { EmployeSignUpDto, toCreateEmployeDto } from './dto/employe-sign-up-dto';
import { EmployeLoginDto } from './dto/employe-login.dto';

@Injectable()
export class EmployeService {
  constructor(
    @InjectRepository(Employe) private employeRepository: Repository<Employe>,
    private authService: AuthService
  ) {}
  
  signup(signupDto: EmployeSignUpDto) {
    // Compare passwords
    if (signupDto.password !== signupDto.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const { salt, hashedPassword } = this.authService.hashPassword(signupDto.password);

    // Create the client
    this.create(toCreateEmployeDto(signupDto, salt, hashedPassword)).then(employe => {
      // Generate the token
      return this.authService.generateJwtToken(employe);
    });
  }

  async login(loginDto: EmployeLoginDto) {
    // Find the employee
    const employe = await this.findByEmployeId(loginDto.employeId);

    // Check if the employee exists
    if (!employe) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    // Check if the password is correct
    if (!this.authService.comparePassword(loginDto.password, employe.hashedPassword)) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    // Generate the token
    return this.authService.generateJwtToken(employe)
  }

  create(createEmployeDto: CreateEmployeDto) {
    return this.employeRepository.save(createEmployeDto);
  }

  findAll() {
    return this.employeRepository.find();
  }

  findByEmployeId(employeId: string) {
    return this.employeRepository.findOne({ where: { employeId: employeId } });
  }

  findOne(id: string) {
    return this.employeRepository.findOne({ where: { id: id } });
  }

  update(id: string, updateEmployeDto: UpdateEmployeDto) {
    return this.employeRepository.update({ id: id}, updateEmployeDto);
  }

  remove(id: string) {
    return this.employeRepository.delete({ id: id });
  }
}
