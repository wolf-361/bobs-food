import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { ItemCategory } from './entities/item-categorie';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>
  ) {}

  create(createItemDto: CreateItemDto) {
    return this.itemRepository.save(createItemDto);
  }

  findAll() {
    return this.itemRepository.find();
  }

  findByCategory(categorie: ItemCategory) {
    return this.itemRepository.find({ where: { categorie } });
  }

  findOne(id: number) {
    return this.itemRepository.findOne({ where: { id } });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemRepository.update({ id }, updateItemDto);
  }

  remove(id: number) {
    return this.itemRepository.delete({ id });
  }
}
