import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import { ClientSignUpDto, toCreateClientDto } from './dto/client-sign-up.dto';
import { ClientLoginDto } from './dto/client-login.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    private authService: AuthService
  ) {}

  signup(signupDto: ClientSignUpDto) {
    // Compare passwords
    if (signupDto.password !== signupDto.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const { salt, hashedPassword } = this.authService.hashPassword(signupDto.password);

    // Create the client
    return this.create(toCreateClientDto(signupDto, salt, hashedPassword));
  }

  async login(loginDto: ClientLoginDto) {
    // Find the client
    const client = await this.findOneByEmail(loginDto.email);

    // Check if the client exists
    if (!client) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    // Check if the password is correct
    if (!this.authService.comparePassword(loginDto.password, client.hashedPassword)) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    // Generate the token
    return this.authService.generateJwtToken(client)
  }

  create(createClientDto: CreateClientDto) {
    return this.clientRepository.save(createClientDto);
  }

  findAll() {
    return this.clientRepository.find();
  }

  findOneByEmail(email: string) {
    return this.clientRepository.findOne({ where: { courriel: email } });
  }

  findOne(id: string) {
    return this.clientRepository.findOne({ where: { id: id } });
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update({ id: id }, updateClientDto);
  }

  remove(id: string) {
    return this.clientRepository.delete({ id: id });
  }
}
