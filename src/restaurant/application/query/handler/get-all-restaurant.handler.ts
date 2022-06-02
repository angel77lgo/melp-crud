import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { RestaurantInterface, RESTAURANT_SERVICE_TOKEN } from "../../../domain/restuarant.contract";
import { GetAllRestaurantQuery } from "../impl/get-all-restaurant.query";

@QueryHandler(GetAllRestaurantQuery)
export class GetAllRestaurantHandler implements IQueryHandler<GetAllRestaurantQuery> {
  constructor(@Inject(RESTAURANT_SERVICE_TOKEN) private readonly restuarantService: RestaurantInterface) {}

  public async execute(query: GetAllRestaurantQuery): Promise<any> {
    return await this.restuarantService.getAllRestuarants(query.limit, query.page);
  }
}