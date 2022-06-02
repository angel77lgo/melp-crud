import { Module } from '@nestjs/common';
import { RestaurantController } from './infraestructure/restaurant.controller';
import { RestaurantService } from './domain/restaurant.service';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService]
})
export class RestaurantModule {}
