import { IQuery } from "@nestjs/cqrs";

export class GetOneRestaurantByIdQuery implements IQuery {
  constructor (readonly restuarantId: string) {}
}