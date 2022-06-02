import { AddRestaurantDto } from "./dto/add-restaurant.dto";

export const RESTAURANT_SERVICE_TOKEN = 'restuarant_service_token';

export interface RestaurantInterface {
  getNearRestaurants(latitude: number, longitude: number, radius: number): any;
  deleteRestaurant(restaurantId: string): any;
  updateRestaurant(restaurantId: string, updateRestuarante: AddRestaurantDto): any;
  addRestaurant(addRestuarant: AddRestaurantDto): any;
  getOneById(restuarantId: string): any;

  getAllRestuarants(limit: number, page: number): any;

}