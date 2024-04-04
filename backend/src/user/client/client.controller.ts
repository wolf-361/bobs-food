import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ClientService } from './client.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    return this.clientService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.clientService.login(loginDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get the current user (logged in)' })
  getSelf(@Request() req) {
    return this.findOne(req.user.id);
  }

  @Get("all")
  @ApiOperation({ summary: 'Get all users' })
  @Roles(['admin'])
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
