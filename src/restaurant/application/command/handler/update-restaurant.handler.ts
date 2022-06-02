import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RestaurantInterface, RESTAURANT_SERVICE_TOKEN } from "../../../domain/restuarant.contract";
import { UpdateRestaurantCommand } from "../impl/update-restaurante.command";

@CommandHandler(UpdateRestaurantCommand)
export class UpdateRestaurantHandler implements ICommandHandler<UpdateRestaurantCommand> {
  constructor(@Inject(RESTAURANT_SERVICE_TOKEN) private readonly restaurantService: RestaurantInterface) {}

  public async execute(command: UpdateRestaurantCommand): Promise<any> {
    return await this.restaurantService.updateRestaurant(command.restauranteId, command.updateRestuarante);
  }
}