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

  async signup(signupDto: ClientSignUpDto): Promise<{ token: string, expiresIn: number, role: string }> {
    // Check if the client already exists
    await this.findOneByEmail(signupDto.courriel).then(client => {
      if (client !== undefined && client !== null) {
        throw new HttpException('Client already exists', HttpStatus.BAD_REQUEST);
      }
    });

    // Compare passwords
    if (signupDto.password !== signupDto.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const { salt, hashedPassword } = this.authService.hashPassword(signupDto.password);

    // Create the client
    const client = await this.create(toCreateClientDto(signupDto, salt, hashedPassword));
    return this.authService.generateJwtToken(client);
  }

  async login(loginDto: ClientLoginDto): Promise<{ token: string, expiresIn: number, role: string }> {
    // Find the client
    const client = await this.findOneByEmail(loginDto.courriel);

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

  async updatePassword(id: string, oldPassword: string, password: string) {
    // Check if the old password is correct
    const client = await this.findOne(id);
    if (!this.authService.comparePassword(oldPassword, client.hashedPassword)) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    const { salt, hashedPassword } = this.authService.hashPassword(password);
    return this.clientRepository.update({ id: id }, { salt: salt, hashedPassword: hashedPassword });
  }

  remove(id: string) {
    return this.clientRepository.delete({ id: id });
  }
}
