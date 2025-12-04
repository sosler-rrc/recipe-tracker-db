import { Recipe, RecipeIngredient, RecipeStep } from "@/prisma/generated/prisma";
import { RecipeDto } from "@/api/v1/types/recipeDto";

//This function will map the data to the RecipeDto object the front end will expect returned
export function formatRecipe(data: Recipe, steps: RecipeStep[], ingredients: RecipeIngredient[]) {
  return {
    ...data,
    steps: steps.map((x) => x.description),
    ingredients: ingredients.map((x) => x.description),
  } as RecipeDto;
}
