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
  
  async signup(signupDto: EmployeSignUpDto): Promise<{ token: string, expiresIn: number, role: string }> {
    // Check if the employee already exists
    await this.findByEmployeId(signupDto.employeId).then(employe => {
      if (employe !== undefined && employe !== null) {
        throw new HttpException('Employee already exists', HttpStatus.BAD_REQUEST);
      }
    });

    // Compare passwords
    if (signupDto.password !== signupDto.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const { salt, hashedPassword } = this.authService.hashPassword(signupDto.password);

    // Create the client
    const employe = await this.create(toCreateEmployeDto(signupDto, salt, hashedPassword));
    return this.authService.generateJwtToken(employe);
  }

  async login(loginDto: EmployeLoginDto): Promise<{ token: string, expiresIn: number, role: string }> {
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

  updatePassword(id: string, password: string) {
    const { salt, hashedPassword } = this.authService.hashPassword(password);
    return this.employeRepository.update({ id: id }, { salt: salt, hashedPassword: hashedPassword });
  }

  remove(id: string) {
    return this.employeRepository.delete({ id: id });
  }
}
