import { ICommand } from "@nestjs/cqrs";
import { AddRestaurantDto } from "../../../domain/dto/add-restaurant.dto";

export class CreateRestaurantCommand implements ICommand {
  constructor(readonly addRestuarant: AddRestaurantDto) {}
}