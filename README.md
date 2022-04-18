## HOW THE PROJECT WORKS
   The project comprises three microservices, customer-service, billing-service and the worker-service (Billing worker service).
   Customers are onboarded through the registration endpoints(available in the API docs), and proceed to verify their accounts.
   Once an account has been verified, they can perform other tasks, like funding their account.

   ### Funding a customer's account
   Customers can fund their account with the /api/v1/customers/funds endpoint, this takes a payload the has an amount, this specify how much
   they want to top up.
   The topup is sent as a REST API request to the ```billing-service```.
   The ```billing-serivice``` will validate the payload and create a ```transaction``` with a status of ```pending`` from the payload.
   This ```transaction``` is saved in the database and also published through a rabbitmq queue.

## SEED DATABASE IN DOCKER-COMPOSE
just run docker-compose run --rm app npx sequelize-cli db:migrate

or... if you have the service already running, you could simply login to the container (docker-compose exec app bash) and run the command inside your running container (npx sequelize-cli db:migrate)

## SEED THE DATABASE BEFORE TESTING

## MIGRATE AND SEED DATABASE
Command to run database migrations and seeding the database are in "entrypoint.sh" file
this file is run automatically when you run the command "docker-compose up --build"
