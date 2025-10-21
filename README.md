## Steps to Run Recipe Tracker DB

Download Postgres from this URL: https://www.postgresql.org/download/
Download PGAdmin so you can interact directly with your database: https://www.pgadmin.org/download/

Create an .env file at the base of the repo and add the following configuration items

```
DATABASE_URL - This is the URL of your Postgres DB, the default port is 5432, I'm using 5434 since I've setup my docker config to use that port.
FRONTEND_URL - This is the URL of your frontend app
NODE_ENV - This will allow us to determine if the app is in production or dev mode
PORT - This is the port your API will run on
```

Here is my .env file as an example

```sh
  DATABASE_URL="postgresql://postgres:postgres@localhost:5434/postgres?schema=recipe-tracker"
  FRONTEND_URL=http://localhost:5173
  NODE_ENV=development
  PORT=3000
```

1. Install dependencies
   `npm i`

2. Migrate Database
   `npm run prisma:migrate`

3. Seed the database
   `npm run prisma:seed`

4. Run the application
   `npm run dev`
