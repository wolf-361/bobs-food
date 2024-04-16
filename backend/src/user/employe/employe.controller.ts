import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { EmployeSignUpDto } from './dto/employe-sign-up-dto';
import { EmployeLoginDto } from './dto/employe-login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles/roles.decorator';

@ApiTags('user')
@Controller('employe')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Post('signup')
  @Roles(['gestionnaire', 'admin', 'proprietaire'])
  signup(@Body() signupDto: EmployeSignUpDto) {
    return this.employeService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: EmployeLoginDto) {
    return this.employeService.login(loginDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get the current user (logged in)' })
  @Roles(['employe', 'gestionnaire', 'admin', 'proprietaire'])
  getSelf(@Request() req) {
    return this.findOne(req.user.id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete the current user (logged in)' })
  @Roles(['employe', 'gestionnaire', 'admin', 'proprietaire'])
  deleteSelf(@Request() req) {
    return this.remove(req.user.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update the current user (logged in)' })
  @Roles(['employe', 'gestionnaire', 'admin', 'proprietaire'])
  updateSelf(@Request() req, @Body() updateEmployeDto: UpdateEmployeDto) {
    return this.update(req.user.id, updateEmployeDto);
  }

  @Get('all')
  @Roles(['gestionnaire', 'admin', 'proprietaire'])
  findAll() {
    return this.employeService.findAll();
  }

  @Get(':id')
  @Roles(['employe', 'gestionnaire', 'admin', 'proprietaire'])
  findOne(@Param('id') id: string) {
    return this.employeService.findOne(id);
  }

  @Patch(':id')
  @Roles(['employe', 'gestionnaire', 'admin', 'proprietaire'])
  update(@Param('id') id: string, @Body() updateEmployeDto: UpdateEmployeDto) {
    return this.employeService.update(id, updateEmployeDto);
  }

  @Delete(':id')
  @Roles(['employe', 'gestionnaire', 'admin', 'proprietaire'])
  remove(@Param('id') id: string) {
    return this.employeService.remove(id);
  }
}
