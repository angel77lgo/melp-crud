import { ICommand } from "@nestjs/cqrs";

export class DeleteRestaurantCommand implements ICommand {
  constructor(readonly restaurantId: string) {}
}