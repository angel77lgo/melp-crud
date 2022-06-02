# Melp Test

Esta es una API que permite la creación de restaurants, así como la consulta de los restaurants más cercanos a su distancia actual.

La app se encuentra desplegada en heroku conectada a una base de datos MySQL

Para inicar el proyecto en local, es necesario correr el siguiente comando:

```
docker-compose up
```

Para poder crear la base de datos y rellenar la tabla

```shell
docker-compose exec app npm run typeorm migration:run
```