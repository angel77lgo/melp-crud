import { isEmpty } from "class-validator";
import { readFileSync } from "fs";
import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Restaurant } from "../../restaurant/domain/restaurant.entity";

export class initTable1654186355476 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const restaurantTable = new Table({
      name: 'restaurant',
      columns: [
        { name: 'id', type: 'varchar', isPrimary: true, generationStrategy: 'uuid' },
        { name: 'rating', type: 'int' },
        { name: 'name', type: 'varchar', length: '100' },
        { name: 'site', type: 'varchar', length: '100' },
        { name: 'email', type: 'varchar', length: '50' },
        { name: 'phone', type: 'varchar', length: '30' },
        { name: 'street', type: 'varchar', length: '150' },
        { name: 'city', type: 'varchar', length: '50' },
        { name: 'state', type: 'varchar', length: '50' },
        { name: 'lat', type: 'float' },
        { name: 'lng', type: 'float' },
        { name: 'created_at', type: 'timestamp', default: 'now()', isNullable: false },
        { name: 'updated_at', type: 'timestamp', default: 'now()', onUpdate: 'now()', isNullable: false },
        { name: 'deleted_at', type: 'timestamp', isNullable: true }
      ]
    });

    await queryRunner.createTable(restaurantTable);

    let data = readFileSync('restaurantes.csv', 'utf-8');
    let dataRestuarant = data.split("\n");

 
    dataRestuarant.shift()
    for (let d of dataRestuarant) {
      const nRestaurant = d.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
  
      if (!isEmpty(nRestaurant[0])){
        const query = `INSERT INTO restaurant (id, rating, name, site, email, phone, street, city, state, lat, lng) VALUES ('${nRestaurant[0]}', ${nRestaurant[1]}, '${nRestaurant[2].replace(/['"]+/g,'')}', '${nRestaurant[3]}', '${nRestaurant[4]}', '${nRestaurant[5]}', '${nRestaurant[6]}', '${nRestaurant[7]}', '${nRestaurant[8]}', ${nRestaurant[9]}, ${nRestaurant[10]});`;
       
        await queryRunner.query(query)
      }


    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
