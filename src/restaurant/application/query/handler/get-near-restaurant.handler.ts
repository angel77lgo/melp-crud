import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { RestaurantInterface, RESTAURANT_SERVICE_TOKEN } from "../../../domain/restuarant.contract";
import { GetNearRestaurantsQuery } from "../impl/get-near-restaurants.query";

@QueryHandler(GetNearRestaurantsQuery)
export class GetNearRestaurantsHandler implements IQueryHandler<GetNearRestaurantsQuery> {
  constructor(@Inject(RESTAURANT_SERVICE_TOKEN) private readonly restaurantService: RestaurantInterface) {}

  public async execute(query: GetNearRestaurantsQuery): Promise<any> {
    return await this.restaurantService.getNearRestaurants(query.latitude, query.longitude, query.radius)
  }
}