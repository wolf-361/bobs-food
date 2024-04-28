import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemService } from 'src/item/item.service';
import { Repository } from 'typeorm';
import { Commande } from './entities/commande.entity';
import { ClientService } from 'src/user/client/client.service';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande) private commandeRepository: Repository<Commande>,
    private clientService: ClientService,
  ) {}

  async create(createCommandeDto: CreateCommandeDto) {
    return this.commandeRepository.save(createCommandeDto);
  }

  findAll() {
    return this.commandeRepository.find();
  }

  findOne(id: number) {
    return this.commandeRepository.findOne({ 
      where: { id },
     });
  }

  update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return this.commandeRepository.save({ id, ...updateCommandeDto });
  }

  async remove(id: number) {
    const commande = await this.findOne(id);
    if (!commande) {
      return null;
    }

    // If the client is inscrit, we should keep the client id to delete the client afterwards
    const clientId = commande.client?.id;

    return this.commandeRepository.delete({ id }).then(async () => {
      if (clientId) {
        await this.clientService.remove(clientId);
      }
    });
  }
}
