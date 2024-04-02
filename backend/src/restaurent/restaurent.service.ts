import { Injectable } from '@nestjs/common';
import { CreateRestaurentDto } from './dto/create-restaurent.dto';
import { UpdateRestaurentDto } from './dto/update-restaurent.dto';

@Injectable()
export class RestaurentService {
  create(createRestaurentDto: CreateRestaurentDto) {
    return 'This action adds a new restaurent';
  }

  findAll() {
    return `This action returns all restaurent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurent`;
  }

  update(id: number, updateRestaurentDto: UpdateRestaurentDto) {
    return `This action updates a #${id} restaurent`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurent`;
  }
}
