import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { SignUpDto } from './dto/sign-up-dto';
import { LoginDto } from './dto/login.dto';

@Controller('employe')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    return this.employeService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.employeService.login(loginDto);
  }

  @Get()
  getSelf(@Request() req) {
    return this.findOne(req.user.id);
  }

  @Get('all')
  findAll() {
    return this.employeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeDto: UpdateEmployeDto) {
    return this.employeService.update(id, updateEmployeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeService.remove(id);
  }
}
