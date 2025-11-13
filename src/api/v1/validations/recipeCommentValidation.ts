import Joi from "joi";
import { requiredString } from "./validationHelper";

export const recipeCommentSchema = Joi.object({
  text: requiredString("text"),
  recipeId: requiredString("recipeId"),
});
