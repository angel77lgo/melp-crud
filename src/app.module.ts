import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CoreModule } from './core/core.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [],
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true,
    logging: true
  }), CoreModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
