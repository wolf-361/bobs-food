import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ClientService } from './client.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientSignUpDto } from './dto/client-sign-up.dto';
import { ClientLoginDto } from './dto/client-login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles/roles.decorator';

@ApiTags('user')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('signup')
  signup(@Body() signupDto: ClientSignUpDto) {
    signupDto.estInscrit = true;
    return this.clientService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: ClientLoginDto) {
    return this.clientService.login(loginDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get the current user (logged in)' })
  @Roles(['client'])
  getSelf(@Request() req) {
    return this.findOne(req.user.id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete the current user (logged in)' })
  @Roles(['client'])
  deleteSelf(@Request() req) {
    return this.remove(req.user.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update the current user (logged in)' })
  @Roles(['client'])
  updateSelf(@Request() req, @Body() updateClientDto: UpdateClientDto) {
    return this.update(req.user.id, updateClientDto);
  }

  @Patch('password')
  @ApiOperation({ summary: 'Update the password of the current user (logged in)' })
  @Roles(['client'])
  updatePassword(@Request() req, @Body() { oldPassword, newPassword }) {
    return this.clientService.updatePassword(req.user.id, oldPassword, newPassword);
  }


  @Get("all")
  @Roles(['gestionnaire', 'admin', 'proprietaire'])
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @Roles(['client', 'employe', 'gestionnaire', 'admin', 'proprietaire'])
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @Roles(['client', 'employe', 'gestionnaire', 'admin', 'proprietaire'])
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @Roles(['client', 'employe', 'gestionnaire', 'admin', 'proprietaire'])
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
