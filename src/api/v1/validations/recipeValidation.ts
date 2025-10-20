import Joi from "joi";
import { requiredArray, requiredBoolean, requiredNumber, requiredString } from "./validationHelper";

export const recipeSchema = Joi.object({
  id: Joi.string().optional(),
  name: requiredString("Name"),
  description: requiredString("Description"),
  servings: requiredNumber("Servings"),
  prepTime: requiredNumber("PrepTime"),
  cookTime: requiredNumber("CookTime"),
  recipeTypeId: requiredString("recipeTypeId"),
  saved: requiredBoolean("saved"),
  ovenTemp: Joi.number().allow(null).optional(),
  ingredients: requiredArray("ingredients"),
  steps: requiredArray("steps"),
});
