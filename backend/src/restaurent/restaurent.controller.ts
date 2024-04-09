import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurentService } from './restaurent.service';
import { CreateRestaurentDto } from './dto/create-restaurent.dto';
import { UpdateRestaurentDto } from './dto/update-restaurent.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles/roles.decorator';

@ApiTags('restaurent')
@Controller('restaurent')
export class RestaurentController {
  constructor(private readonly restaurentService: RestaurentService) {}

  @Post()
  @Roles(['gestionnaire', 'admin', 'proprietaire'])
  create(@Body() createRestaurentDto: CreateRestaurentDto) {
    return this.restaurentService.create(createRestaurentDto);
  }

  @Get()
  findAll() {
    return this.restaurentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurentService.findOne(id);
  }

  @Patch(':id')
  @Roles(['gestionnaire', 'admin', 'proprietaire'])
  update(@Param('id') id: string, @Body() updateRestaurentDto: UpdateRestaurentDto) {
    return this.restaurentService.update(id, updateRestaurentDto);
  }

  @Delete(':id')
  @Roles(['gestionnaire', 'admin', 'proprietaire'])
  remove(@Param('id') id: string) {
    return this.restaurentService.remove(id);
  }
}
