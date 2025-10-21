import prisma from "../../../../prisma/client";
import { RecipeDto } from "../types/recipeDto";

export const fetchAllRecipes = async (): Promise<RecipeDto[]> => {
  const data = await prisma.recipe.findMany({
    include: {
      ingredients: true,
      steps: true,
    },
  });

  return data.map(
    (x) =>
      ({
        ...x,
        steps: x.steps.map((x) => x.description),
        ingredients: x.ingredients.map((x) => x.description),
      } as RecipeDto)
  );
};

export const getRecipeById = async (id: string): Promise<RecipeDto | null> => {
  try {
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
      const formattedData = {
        ...data,
        steps: data.steps.map((x) => x.description),
        ingredients: data.ingredients.map((x) => x.description),
      } as RecipeDto;

      return formattedData;
    }
  } catch (error) {
    throw new Error(`Failed to fetch Recipe with id ${id}`);
  }
};

export const createRecipe = async (recipeDto: RecipeDto): Promise<RecipeDto> => {
  const { ingredients, steps, updatedAt, createdAt, ...recipeData } = recipeDto;

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

  const formattedData = {
    ...data,
    steps: data.steps.map((x) => x.description),
    ingredients: data.ingredients.map((x) => x.description),
  } as RecipeDto;

  return formattedData;
};

export const updateRecipe = async (id: string, recipeDto: RecipeDto): Promise<RecipeDto> => {
  const { ingredients, steps, updatedAt, createdAt, ...recipeData } = recipeDto;

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

  const formattedData = {
    ...data,
    steps: data.steps.map((x) => x.description),
    ingredients: data.ingredients.map((x) => x.description),
  } as RecipeDto;

  return formattedData;
};

export const deleteRecipe = async (id: string): Promise<void> => {
  await prisma.recipe.delete({
    where: {
      id: id,
    },
  });
};
