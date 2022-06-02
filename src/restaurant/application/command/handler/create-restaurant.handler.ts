import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RestaurantInterface, RESTAURANT_SERVICE_TOKEN } from "../../../domain/restuarant.contract";
import { CreateRestaurantCommand } from "../impl/create-restaurant.command";

@CommandHandler(CreateRestaurantCommand)
export class CreateRestaurantHandler implements ICommandHandler<CreateRestaurantCommand> {
  constructor (@Inject(RESTAURANT_SERVICE_TOKEN) private readonly restaurantService: RestaurantInterface) {}

  public async execute(command: CreateRestaurantCommand): Promise<any> {
    return await this.restaurantService.addRestaurant(command.addRestuarant);
  }
}