import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { EmployeSignUpDto } from './dto/employe-sign-up-dto';
import { EmployeLoginDto } from './dto/employe-login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('employe')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Post('signup')
  signup(@Body() signupDto: EmployeSignUpDto) {
    return this.employeService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: EmployeLoginDto) {
    return this.employeService.login(loginDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get the current user (logged in)' })
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
