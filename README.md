## Udacity Full Stack javascript developer - Storefront Backend
This is the second project of the Udacity Full Stack Javascript Developer Nanodegree program: Storefront Backend.

It consists of an Express server, combined with a Postgres database, that exposes an API for a storefront backend. Users' passwords are stored encrypted in the database, and accessing some endpoints requires a JWT token. All functions to access the Postgres database, and all the API endpoints have associated unit tests.

The starting point for this project is the repository available at: https://github.com/udacity/nd0067-c2-creating-an-api-with-postgresql-and-express-project-starter

## Implementation
Key points:

Uses Express as web server
Uses Postgres for the SQL database
Uses bcrypt for password encryption
Uses JWT for authorization
Uses Jasmine and supertest for unit tests
Development done with TypeScript to reduce errors
# Deployment

## Setting up the Postgres database
In order to run this app you need a properly configured Postgres database. For this, you need a Postgres server running on your machine (see for exemple https://www.postgresql.org/).

Once Postgres is available on your computer, you need to enter `psql` as admin/root and do the following:

First create the user `storefront_user` by running in the psql command line:
```
CREATE USER storefront_user with password '7kJ3DDpqnHe3Qx';
```
Then create the databases for development and testing
```
CREATE DATABASE storefront_backend;
CREATE DATABASE storefront_backend_test;
```
Finally, grant `storefront_user` access to these databases
```
GRANT ALL PRIVILEGES ON DATABASE storefront_backend TO storefront_user;
GRANT ALL PRIVILEGES ON DATABASE storefront_backend_test TO storefront_user;
```

## Setting up environment variables
The following environment variables need to be set up:
- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=storefront_backend
- POSTGRES_DB_TEST=storefront_backend_test
- POSTGRES_USER=storefront_user
- POSTGRES_PASSWORD=7kJ3DDpqnHe3Qx
- ENV=dev
- BCRYPT_SALT_ROUNDS=10
- TOKEN_SECRET=LV7erLeKYDY47p (This value can be changed)
- BCRYPT_PEPPER=ifSgBKoG5HShSW (This value can be changed)
Dependencies and versions used
The project depends on the following packages:

express
bcrypt
cors
db-migrate
db-migrate-pg
dotenv
jsonwebtoken
pg
typescript
For development, there are additional dependencies

jasmine
jasmine-spec-reporter
jasmine-ts
prettier
eslint-config-prettier
eslint-plugin-prettier
nodemon
supertest
ts-node
tsc-watch
See the file package.json for the exact versions used.

## Directory Structure
```
project
│   .env   
│   README.md
├── docker            # Files required for creating staging and production docker images
├── docs              # Documentation
├── logs              # Automatically generated, contains application logs divided into days
├── prisma            
│   │   schema.prisma # The schema definition of the Models
│   └── migrations    # Contains the migration files
├──src
│  │   app.ts
│  │   environment.ts
│  ├── controllers    # The controllers handles all the logic and sending responses with correct codes
│  ├── exceptions     # The custom exceptions
│  ├── helpers        # Helper functions / classes
│  ├── interfaces     # The custom interfaces
│  ├── middlewares    # The custom middlewares
│  ├── routes         # The API routes maps to the Controllers
│  ├── services       # The services contains the database queries and returning objects or throwing errors
│  └── validations    # Validations to validate data before being processed by controllers (used in routes)

```

## Development Instructions

1. Copy and rename `.env.example` file to `.env` and edit settings
2. Run `npm install` command to install dependencies
3. Run `npx prisma migrate dev` command to initialize the database or `npx prisma generate` command if the database already exists
4. Run `npm start` or `npm run dev` command to run local server (it restarts each time the code is changed)



