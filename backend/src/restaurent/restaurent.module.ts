import { Module } from '@nestjs/common';
import { RestaurentService } from './restaurent.service';
import { RestaurentController } from './restaurent.controller';
import { ItemModule } from 'src/item/item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurent } from './entities/restaurent.entity';

@Module({
  imports: [
    ItemModule,
    TypeOrmModule.forFeature([Restaurent]),
  ],
  controllers: [RestaurentController],
  providers: [RestaurentService],
  exports: [RestaurentService]
})
export class RestaurentModule {}
