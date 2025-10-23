import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import setupSwagger from "./config/swagger";
import corsOptions from "./config/cors";
import { useExpressServer } from "routing-controllers";
import { RecipeController } from "./api/v1/controllers/recipeController";
import { RecipeTypeController } from "./api/v1/controllers/recipeTypeController";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// setup the controllers and use the /api/v1 prefix for the routes
useExpressServer(app, {
  routePrefix: "/api/v1",
  controllers: [RecipeController, RecipeTypeController],
  cors: corsOptions,
  defaultErrorHandler: false,
});

dotenv.config();

setupSwagger(app);

app.get("/", (_req, res) => {
  res.send("Got response from backend!");
});

export default app;
