import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRestaurantCommand } from '../application/command/impl/create-restaurant.command';
import { DeleteRestaurantCommand } from '../application/command/impl/delete-restaurant.command';
import { UpdateRestaurantCommand } from '../application/command/impl/update-restaurante.command';
import { GetAllRestaurantQuery } from '../application/query/impl/get-all-restaurant.query';
import { GetOneRestaurantByIdQuery } from '../application/query/impl/get-one-restaurant-by-id.query';
import { AddRestaurantDto } from '../domain/dto/add-restaurant.dto';

@Controller('/api/restaurant')
export class RestaurantController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ){}

  @Get()
  @HttpCode(200)
  public async getRestuarant(@Query('limit') limit: number, @Query('page') page: number) {
    return await this.queryBus.execute(new GetAllRestaurantQuery(limit, page))
  }

  @Get(':restaurantId')
  @HttpCode(200)
  public async getRestaurantById(@Param('restaurantId') restaurantId: string) {
  
    return await this.queryBus.execute(new GetOneRestaurantByIdQuery(restaurantId));
  }

  @Post()
  @HttpCode(201)
  public async createRestaurant(@Body() addRestaurant: AddRestaurantDto) {
    return await this.commandBus.execute(new CreateRestaurantCommand(addRestaurant))
  }

  @Put(':restaurantId')
  @HttpCode(200)
  public async updateRestaurante(@Param('restaurantId') restaurantId: string, @Body() update: AddRestaurantDto) {
    return await this.commandBus.execute(new UpdateRestaurantCommand(restaurantId, update))
  }

  @Delete(':restaurantId')
  @HttpCode(200)
  public async deleteRestaurant(@Param('restaurantId') restaurantId: string) {
    return await this.commandBus.execute(new DeleteRestaurantCommand(restaurantId));
  }


}
