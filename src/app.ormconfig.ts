import { ConnectionOptions } from "typeorm";
import 'dotenv/config';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
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