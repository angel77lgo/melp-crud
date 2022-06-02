
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { createQueryBuilder, Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { RestaurantInterface } from './restuarant.contract';
import 'dotenv/config';
import { isEmail, isEmpty } from 'class-validator';
import { HttpException, NotFoundException } from '@nestjs/common';
import { AddRestaurantDto } from './dto/add-restaurant.dto';
import { PartialType } from '@nestjs/swagger';
import { standarDeviation, validateRestaurant } from '../../core/utils/utils';

export class RestaurantService implements RestaurantInterface {

  constructor(
    @InjectRepository(Restaurant) private readonly restaurantRepository: Repository<Restaurant>
  ) { }

  public async getAllRestuarants(limit: number, page: number) {
    const query = this.restaurantRepository.createQueryBuilder().orderBy('created_at', 'ASC');

    const url = `${process.env.ROUTE}/restaurant`

    return await paginate<Restaurant>(query, { limit: limit, page: page, route: url })

  }

  public async getOneById(restuarantId: string) {

    const restaurant = await this.restaurantRepository.findOne(restuarantId);

    if (isEmpty(restaurant)) {
      throw new NotFoundException()
    }
    return restaurant;
  }

  public async addRestaurant(addRestuarant: AddRestaurantDto) {
    console.log(addRestuarant)

    validateRestaurant(addRestuarant);

    return await this.restaurantRepository.save(addRestuarant);
  }

  public async updateRestaurant(restaurantId: string, updateRestuarante: AddRestaurantDto) {
    const restaurant = await this.restaurantRepository.findOne(restaurantId)

    if (isEmpty(restaurant)) {
      throw new NotFoundException()
    }

    validateRestaurant(updateRestuarante);

    return await this.restaurantRepository.update(restaurantId, updateRestuarante)

  }

  public async deleteRestaurant(restaurantId: string) {
    const restaurant = await this.restaurantRepository.findOne(restaurantId)

    if (isEmpty(restaurant)) {
      throw new NotFoundException()
    }

    return await this.restaurantRepository.softDelete(restaurantId)
  }

  public async getNearRestaurants(latitude: number, longitude: number, radius: number) {

    const restaurants = await this.restaurantRepository.createQueryBuilder('restaurant')
      .select(['*', `ST_Distance_Sphere(
        point(${longitude}, ${latitude}),
        point(lng, lat)
      ) AS distance`]).having(`distance < ${radius}`).getRawMany()

    let rating = 0;
    let values = [];
    restaurants.forEach((restaurant) => {
      rating = rating + restaurant.rating
      values.push(restaurant.rating)
    })

    console.log(restaurants);

    const avg = Number((rating / restaurants.length).toFixed(2))

    const std = await standarDeviation(values, avg)

    return {
      count: restaurants.length,
      avg: avg,
      std: std
    };
  }


}
