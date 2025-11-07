import prisma from "../../../../prisma/client";
import { RecipeDto } from "../types/recipeDto";

export const fetchAllRecipes = async (): Promise<RecipeDto[]> => {
  const data = await prisma.recipe.findMany({
    include: {
      ingredients: true,
      steps: true,
      user: true,
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

export const fetchUserSavedRecipeIds = async (userId: string): Promise<string[]> => {
  const userSavedRecipes = await prisma.userSavedRecipes.findMany({
    where: {
      userId: userId,
    },
  });

  const data = await prisma.recipe.findMany({
    where: {
      id: { in: userSavedRecipes.map((x) => x.recipeId) },
    },
  });

  return data.map((x) => x.id);
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
        user: true,
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

export const toggleUserSavedRecipe = async (recipeId: string, userId: string): Promise<void> => {
  const existingRecord = await prisma.userSavedRecipes.findFirst({
    where: {
      recipeId: recipeId,
      userId: userId,
    },
  });

  if (existingRecord) {
    await prisma.userSavedRecipes.delete({
      where: {
        id: existingRecord.id,
      },
    });
  } else {
    await prisma.userSavedRecipes.create({
      data: {
        recipeId,
        userId,
      },
    });
  }
};

export const createRecipe = async (recipeDto: RecipeDto, user: string): Promise<RecipeDto> => {
  const { ingredients, steps, updatedAt, createdAt, userId, ...recipeData } = recipeDto;

  const data = await prisma.recipe.create({
    data: {
      ...recipeData,
      userId: user,
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
      user: true,
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
      user: true,
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
