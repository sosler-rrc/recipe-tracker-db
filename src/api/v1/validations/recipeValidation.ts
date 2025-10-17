import Joi, { BooleanSchema, NumberSchema, StringSchema } from "joi";

const requiredString = (fieldName: string): StringSchema => {
  return Joi.string()
    .required()
    .messages({
      "any.required": `${fieldName} is required`,
      "string.empty": `${fieldName} cannot be empty`,
    });
};

const requiredNumber = (fieldName: string): NumberSchema => {
  return Joi.number()
    .required()
    .messages({
      "any.required": `${fieldName} is required`,
      "number.base": `${fieldName} must be a number`,
    });
};

const requiredBoolean = (fieldName: string): BooleanSchema => {
  return Joi.boolean()
    .required()
    .messages({
      "any.required": `${fieldName} is required`,
    });
};

export const recipeSchema = Joi.object({
  id: Joi.string().optional(),
  name: requiredString("Name"),
  description: requiredString("Description"),
  servings: requiredNumber("Servings"),
  prepTime: requiredNumber("PrepTime"),
  cookTime: requiredNumber("CookTime"),
  type: requiredString("RecipeType"),
  recipeSaved: requiredBoolean("RecipeSaved"),
  ovenTemp: Joi.number().optional(),
});

// export interface Recipe {
//   id: string;
//   name: string;
//   description: string;
//   type: RecipeType;

//   ingredients: string[];
//   steps: string[];

//   servings: number;
//   prepTime: number; // mins
//   cookTime: number; // mins
//   recipeSaved: boolean;
//   ovenTemp?: number;

//   image: string;
// }
