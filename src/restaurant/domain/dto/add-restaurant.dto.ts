
   
import { ApiProperty, PickType } from "@nestjs/swagger";
import { Max, Min } from "class-validator";
import { Restaurant } from "../restaurant.entity";

export class AddRestaurantDto extends PickType(Restaurant, ['rating', 'name', 'site', 'email', 'phone', 'street', 'city', 'state', 'lat', 'lng']) {

  @Min(0)
  @Max(4)
  rating: number;
  name: string;
  site: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}