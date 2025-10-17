import prisma from "../../../../prisma/client";
import { Recipe } from "../../../../prisma/generated/prisma";

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  return prisma.recipe.findMany();
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    const Recipe = prisma.recipe.findUnique({
      where: {
        id: id,
      },
    });

    if (!Recipe) {
      return null;
    } else {
      return Recipe;
    }
  } catch (error) {
    throw new Error(`Failed to fetch Recipe with id ${id}`);
  }
};

export const createRecipe = async (RecipeData: Recipe): Promise<Recipe> => {
  const newRecipe: Recipe = await prisma.recipe.create({
    data: {
      ...RecipeData,
    },
  });

  return newRecipe;
};

export const updateRecipe = async (id: string, recipe: Recipe): Promise<Recipe> => {
  const updateRecipe = await prisma.recipe.update({
    where: {
      id: id,
    },
    data: {
      ...recipe,
    },
  });
  return updateRecipe;
};

export const deleteRecipe = async (id: string): Promise<void> => {
  await prisma.recipe.delete({
    where: {
      id: id,
    },
  });
};
