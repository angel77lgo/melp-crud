import { ConnectionOptions } from "typeorm";
import 'dotenv/config';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const config: ConnectionOptions = {
  name: 'default',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: ['src/core/migrations/{*.ts,.js}'],
  cli: {
    migrationsDir: 'src/core/migrations'
  }
}

export = config;