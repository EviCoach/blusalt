
## SEED DATABASE IN DOCKER-COMPOSE
just run docker-compose run --rm app npx sequelize-cli db:migrate

or... if you have the service already running, you could simply login to the container (docker-compose exec app bash) and run the command inside your running container (npx sequelize-cli db:migrate)
