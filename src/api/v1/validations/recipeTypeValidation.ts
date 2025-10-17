import Joi from "joi";
import { requiredString } from "./validationHelper";

export const recipeTypeSchema = Joi.object({
  id: Joi.string().optional(),
  name: requiredString("name"),
  description: requiredString("description"),
});
