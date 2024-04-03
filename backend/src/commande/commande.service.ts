import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemService } from 'src/item/item.service';
import { Repository } from 'typeorm';
import { Commande } from './entities/commande.entity';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande) private commandeRepository: Repository<Commande>
  ) {}

  create(createCommandeDto: CreateCommandeDto) {
    return this.commandeRepository.save(createCommandeDto);
  }

  findAll() {
    return this.commandeRepository.find();
  }

  findOne(id: number) {
    return this.commandeRepository.findOne({ where: { id } });
  }

  update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return this.commandeRepository.update({ id }, updateCommandeDto);
  }

  remove(id: number) {
    return this.commandeRepository.delete({ id });
  }
}
