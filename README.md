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
