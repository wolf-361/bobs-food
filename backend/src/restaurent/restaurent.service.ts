import { Injectable } from '@nestjs/common';
import { CreateRestaurentDto } from './dto/create-restaurent.dto';
import { UpdateRestaurentDto } from './dto/update-restaurent.dto';
import { Restaurent } from './entities/restaurent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class RestaurentService {
  constructor(
    @InjectRepository(Restaurent) private restaurentRepository: Repository<Restaurent>,
    private itemService: ItemService
  ) {}

  async create(createRestaurentDto: CreateRestaurentDto) {
    // Get the item ids from the createRestaurentDto
    const itemIds = createRestaurentDto.menu;

    // Create a new restaurent
    const restaurent = new Restaurent();
    restaurent.adresse = createRestaurentDto.adresse;
    for (const itemId of itemIds) {
      const item = await this.itemService.findOne(itemId);
      restaurent.menu.push(item);
    }
    return this.restaurentRepository.save(restaurent);
  }

  findAll() {
    return this.restaurentRepository.find({ relations: ['menu'] });
  }

  findOne(id: string) {
    return this.restaurentRepository.findOne({ where: { id }, relations: ['menu'] });
  }

  async update(id: string, updateRestaurentDto: UpdateRestaurentDto) {
    // Get the item ids from the updateRestaurentDto
    const itemIds = updateRestaurentDto.menu;

    // Create a new restaurent
    const restaurent = new Restaurent();
    restaurent.adresse = updateRestaurentDto.adresse;
    for (const itemId of itemIds) {
      const item = await this.itemService.findOne(itemId);
      restaurent.menu.push(item);
    }

    return this.restaurentRepository.update(id, restaurent);
  }

  remove(id: string) {
    return this.restaurentRepository.delete(id);
  }
}
