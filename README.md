## Project setup

Create .env file based on .env.example file

```bash
$ docker network create task-app
$ docker compose up --build -d postgres
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
