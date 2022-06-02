import { Module, OnModuleInit } from '@nestjs/common';
import { RestaurantController } from './infraestructure/restaurant.controller';
import { RestaurantService } from './domain/restaurant.service';
import { RESTAURANT_SERVICE_TOKEN } from './domain/restuarant.contract';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './domain/restaurant.entity';
import { GetAllRestaurantHandler } from './application/query/handler/get-all-restaurant.handler';
import { GetOneRestaurantByIdHandler } from './application/query/handler/get-one-restaurant-by-id.handler';
import { CreateRestaurantHandler } from './application/command/handler/create-restaurant.handler';
import { UpdateRestaurantCommand } from './application/command/impl/update-restaurante.command';
import { UpdateRestaurantHandler } from './application/command/handler/update-restaurant.handler';
import { DeleteRestaurantHandler } from './application/command/handler/delete-restaurant.handler';
import { GetNearRestaurantsHandler } from './application/query/handler/get-near-restaurant.handler';


const commandHandlers = [CreateRestaurantHandler, UpdateRestaurantHandler, DeleteRestaurantHandler];

const queryHandlers = [GetAllRestaurantHandler, GetOneRestaurantByIdHandler, GetNearRestaurantsHandler];
@Module({
  imports:[
    TypeOrmModule.forFeature([Restaurant])
  ],
  controllers: [RestaurantController],
  providers: [
    { provide: RESTAURANT_SERVICE_TOKEN, useClass: RestaurantService },
    CommandBus,
    QueryBus,
    ...commandHandlers,
    ...queryHandlers
  ]
})
export class RestaurantModule implements OnModuleInit{ 
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus
  ) {}

  onModuleInit() {
    this.command$.register(commandHandlers);
    this.query$.register(queryHandlers);
  }
}
