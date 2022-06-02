import { IQuery } from "@nestjs/cqrs";

export class GetNearRestaurantsQuery implements IQuery {
  constructor(readonly latitude: number, readonly longitude: number, readonly radius: number) {}
}