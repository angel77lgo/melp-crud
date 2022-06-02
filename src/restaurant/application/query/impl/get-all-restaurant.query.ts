import { IQuery } from "@nestjs/cqrs";

export class GetAllRestaurantQuery implements IQuery {
  constructor(readonly limit: number, readonly page: number) {}
}