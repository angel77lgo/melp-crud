import { HttpException } from "@nestjs/common";
import { isEmail } from "class-validator";

export const validateRestaurant = (restaurant) => {
  if (restaurant.rating < 0 || restaurant.rating > 4) {
    throw new HttpException("El rating esta fuera del rango", 400);
  }
  if (!isEmail(restaurant.email)) {
    throw new HttpException("Introducir un emial valido", 400)
  }
}

export const standarDeviation = (values: number[], avg: number) => {

  let sum = 0;
  values.forEach(value => {
    let x = Math.pow(value - avg, 2);
    sum = sum + x;
  });
  console.log(values.length)

  return Number(Math.sqrt(sum - (values.length - 1)).toFixed(2))
  
}