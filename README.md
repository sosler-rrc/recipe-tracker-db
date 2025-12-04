## Recipe Tracker Db Application

### Author: Shamus Osler

### Steps to Run Recipe Tracker DB

Follow the steps outlined in the [recipe-tracker](https://github.com/sosler-rrc/recipe-tracker) github

Download Dependencies

- [Postgres](https://www.postgresql.org/download/) (Optional if you are using the docker-compose file)
- [PGAdmin](https://www.pgadmin.org/download/) (Optional - PGAdmin allows you to interact directly with the database)

Create an .env file at the base of the repo and add the following configuration items

- `DATABASE_URL` - This is the URL of your Postgres DB, the default port for Postgres is 5432, I use 5434 since my docker compose file is setup to use that port.
- `FRONTEND_URL` - This is the URL of your frontend app
- `NODE_ENV` - This will allow us to determine if the app is in production or dev mode
- `PORT` - This is the port your API will run on
- `CLERK_PUBLISHABLE_KEY` - This is your clerk publishable key
- `CLERK_SECRET_KEY` - This is your clerk secret key

Example

```sh
  DATABASE_URL="postgresql://postgres:postgres@localhost:5434/postgres?schema=recipe-tracker"
  FRONTEND_URL=http://localhost:5173
  NODE_ENV=development
  PORT=3000
  CLERK_PUBLISHABLE_KEY=<clerk_public_key>
  CLERK_SECRET_KEY=<clerk_secret_key>
```

1. Install dependencies
   `npm i`

2. Migrate Database
   `npm run prisma:migrate`

3. Seed the database
   `npm run prisma:seed`

4. Run the application
   `npm run dev`
