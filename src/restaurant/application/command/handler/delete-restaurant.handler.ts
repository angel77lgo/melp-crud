import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RestaurantInterface, RESTAURANT_SERVICE_TOKEN } from "../../../domain/restuarant.contract";
import { DeleteRestaurantCommand } from "../impl/delete-restaurant.command";

@CommandHandler(DeleteRestaurantCommand)
export class DeleteRestaurantHandler implements ICommandHandler<DeleteRestaurantCommand> {
  constructor(@Inject(RESTAURANT_SERVICE_TOKEN) private readonly restaurantService: RestaurantInterface){}

  public async execute(command: DeleteRestaurantCommand): Promise<any> {
    return await this.restaurantService.deleteRestaurant(command.restaurantId);
  }

}