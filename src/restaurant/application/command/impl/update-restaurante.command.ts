import { ICommand } from "@nestjs/cqrs";
import { AddRestaurantDto } from "../../../domain/dto/add-restaurant.dto";

export class UpdateRestaurantCommand implements ICommand {
  constructor(readonly restauranteId: string ,readonly updateRestuarante: AddRestaurantDto) {}
}