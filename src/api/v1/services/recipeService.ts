import prisma from "../../../../prisma/client";
import { RecipeDto } from "../types/recipeDto";
import { formatRecipe } from "../utils/formatRecipe";

export const fetchAllRecipes = async (): Promise<RecipeDto[]> => {
  //Using include will also return the associated tables (RecipeSteps, RecipeIngreidents) when returning the recipe data
  const data = await prisma.recipe.findMany({
    include: {
      ingredients: true,
      steps: true,
    },
  });

  return data.map((x) => formatRecipe(x, x.steps, x.ingredients));
};

export const getRecipeById = async (id: string): Promise<RecipeDto | null> => {
  try {
    //Find the recipe using the id passed in and return the entire object included  with RecipeSteps & RecipeIngredients
    const data = await prisma.recipe.findUnique({
      where: {
        id: id,
      },
      include: {
        ingredients: true,
        steps: true,
      },
    });

    if (!data) {
      return null;
    } else {
      return formatRecipe(data, data.steps, data.ingredients);
    }
  } catch (error) {
    throw new Error(`Failed to fetch Recipe with id ${id}`);
  }
};

export const createRecipe = async (recipeDto: RecipeDto): Promise<RecipeDto> => {
  const { ingredients, steps, updatedAt, createdAt, ...recipeData } = recipeDto;
  //When creating a recipe we also create the associated RecipeIngreidents and RecipeSteps by mapping the data to the Description column on each table.
  const data = await prisma.recipe.create({
    data: {
      ...recipeData,
      ingredients: {
        createMany: {
          data: ingredients.map((description) => ({ description })),
        },
      },
      steps: {
        createMany: {
          data: steps.map((description) => ({ description })),
        },
      },
    },
    include: {
      ingredients: true,
      steps: true,
    },
  });

  return formatRecipe(data, data.steps, data.ingredients);
};

export const updateRecipe = async (id: string, recipeDto: RecipeDto): Promise<RecipeDto> => {
  const { ingredients, steps, updatedAt, createdAt, ...recipeData } = recipeDto;

  //During an recipe update we clear out the associated entries in the RecipeIngredients & RecipeSteps tables using deleteMany: {} and re-add the entries using createMany
  const data = await prisma.recipe.update({
    where: { id },
    data: {
      ...recipeData,
      ingredients: {
        deleteMany: {},
        createMany: {
          data: ingredients.map((x) => ({ description: x })),
        },
      },
      steps: {
        deleteMany: {},
        createMany: {
          data: steps.map((x) => ({ description: x })),
        },
      },
    },
    include: {
      ingredients: true,
      steps: true,
    },
  });

  return formatRecipe(data, data.steps, data.ingredients);
};

export const deleteRecipe = async (id: string): Promise<void> => {
  await prisma.recipe.delete({
    where: {
      id: id,
    },
  });
};
