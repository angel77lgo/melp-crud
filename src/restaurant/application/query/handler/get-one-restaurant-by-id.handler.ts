import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { RestaurantInterface, RESTAURANT_SERVICE_TOKEN } from "../../../domain/restuarant.contract";
import { GetOneRestaurantByIdQuery } from "../impl/get-one-restaurant-by-id.query";

@QueryHandler(GetOneRestaurantByIdQuery)
export class GetOneRestaurantByIdHandler implements IQueryHandler<GetOneRestaurantByIdQuery> {
  constructor (@Inject(RESTAURANT_SERVICE_TOKEN) private readonly restauranteService: RestaurantInterface) {}

  public async execute(query: GetOneRestaurantByIdQuery): Promise<any> {
    return await this.restauranteService.getOneById(query.restuarantId);
  }
}