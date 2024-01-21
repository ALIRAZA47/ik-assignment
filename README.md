## About The Project

Go to `http://localhost:8085/api-docs` to see the API documentation.<br/>

#### Technologies Used

API documentation is generated using [swagger](https://swagger.io/).<br/>
Logging is done using [winston](https://github.com/winstonjs/winston).<br/>
Linting is done using [eslint](https://eslint.org/).<br/>
Code formatting is done using [prettier](https://prettier.io/).<br/>
Database is [mongodb](https://www.mongodb.com/).<br/>
Database is connected using [mongoose](https://mongoosejs.com/).<br/>
Authentication is done using json web token [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).<br/>
Passwords are hashed using [bcrypt](https://www.npmjs.com/package/bcrypt).<br/>

#### Directory Structure

Routes are defined in `src/controllers` directory.
Models are defined in `src/models` directory.
Services are defined in `src/services` directory.
Middlewares are defined in `src/middlewares` directory.

#### API Endpoints

1. #### Problems 1, 2 and 3

| Method | Endpoint                       | Description | Is Protected? |
|--------|--------------------------------|-------------|---------------|
| POST   | /api/problem-1-scrapping/scrap | Problem 1   | No            |
| GET    | /api/problem-2-api/call-api    | Problem 2   | No            |
| GET    | /api/problem-3-fs/read-files   | Problem 3   | No            |

<br/>

2. #### Problem 4 - Posts CRUD

| Method | Endpoint                           | Description       | Is Protected? |
|--------|------------------------------------|-------------------|---------------|
| GET    | /api/problem-4-posts-crud/         | Get All Posts     | No            |
| GET    | /api/problem-4-posts-crud/:post_id | Get Post By ID    | No            |
| POST   | /api/problem-4-posts-crud          | Create Post       | No            |
| PATCH  | /api/problem-4-posts-crud/:post_id | Update Post by ID | No            |
| DELETE | /api/problem-4-posts-crud/:post_id | Delete Post by ID | No            |

<br/>

3. #### Problem 5 - Authentication

| Method | Endpoint                   | Description        | Is Protected?                                |
|--------|----------------------------|--------------------|----------------------------------------------|
| POST   | /api/problem-5-auth/signup | Register User      | No                                           |
| POST   | /api/problem-5-auth/login  | Login User         | No                                           |
| GET    | /api/problem-5-auth/me     | Get Logged In User | Yes (Get Token using `/api/users/login` API) |

## Project Setup

```
yarn install
```

## Start Development Server

Create a `.env` file in the root directory and add variables from `.env.sample`

```
yarn run start:dev
```

it will start the development server on the port specified in `.env` file. Default port is 3000 if not specified in. You
will be able to see the app running on `http://localhost:8085` or the port specified in `.env` file. Now, to go
to `http://localhost:8085/api-docs` to see the API documentation.

## Build For Production

```
yarn run build
``` 

## Start The Production Server

```
yarn start
```

## Fix Lint Errors

``` 
yarn run lint
```
