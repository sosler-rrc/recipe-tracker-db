import prisma from "../../../../prisma/client";
import { RecipeCommentDto } from "../types/recipeCommentDto";
import { RecipeDto } from "../types/recipeDto";

export const fetchAllRecipes = async (): Promise<RecipeDto[]> => {
  const data = await prisma.recipe.findMany({
    include: {
      ingredients: true,
      steps: true,
      user: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  });

  return data.map(
    (x) =>
      ({
        ...x,
        steps: x.steps.map((x) => x.description),
        ingredients: x.ingredients.map((x) => x.description),
        comments: x.comments.map((x) => ({ userId: x.userId, text: x.text, createdAt: x.createdAt, username: x.user.username, id: x.id } as RecipeCommentDto)),
      } as RecipeDto)
  );
};

export const fetchUserSavedRecipeIds = async (userId: string): Promise<string[]> => {
  const userSavedRecipes = await prisma.userSavedRecipe.findMany({
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
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!data) {
      return null;
    } else {
      const formattedData = {
        ...data,
        steps: data.steps.map((x) => x.description),
        ingredients: data.ingredients.map((x) => x.description),
        comments: data.comments.map(
          (x) => ({ userId: x.userId, text: x.text, createdAt: x.createdAt, username: x.user.username, id: x.id } as RecipeCommentDto)
        ),
      } as RecipeDto;

      return formattedData;
    }
  } catch (error) {
    throw new Error(`Failed to fetch Recipe with id ${id}`);
  }
};

export const toggleUserSavedRecipe = async (recipeId: string, userId: string): Promise<void> => {
  const existingRecord = await prisma.userSavedRecipe.findFirst({
    where: {
      recipeId: recipeId,
      userId: userId,
    },
  });

  if (existingRecord) {
    await prisma.userSavedRecipe.delete({
      where: {
        id: existingRecord.id,
      },
    });
  } else {
    await prisma.userSavedRecipe.create({
      data: {
        recipeId,
        userId,
      },
    });
  }
};

export const createRecipe = async (recipeDto: RecipeDto, user: string): Promise<RecipeDto> => {
  const { ingredients, steps, comments, updatedAt, createdAt, userId, ...recipeData } = recipeDto;

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
      comments: {
        include: {
          user: true,
        },
      },
    },
  });

  const formattedData = {
    ...data,
    steps: data.steps.map((x) => x.description),
    ingredients: data.ingredients.map((x) => x.description),
    comments: data.comments.map((x) => ({ userId: x.userId, text: x.text, createdAt: x.createdAt, username: x.user.username, id: x.id } as RecipeCommentDto)),
  } as RecipeDto;

  return formattedData;
};

export const updateRecipe = async (id: string, recipeDto: RecipeDto): Promise<RecipeDto> => {
  const { ingredients, steps, comments, updatedAt, createdAt, ...recipeData } = recipeDto;

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
      comments: {
        include: {
          user: true,
        },
      },
    },
  });

  const formattedData = {
    ...data,
    steps: data.steps.map((x) => x.description),
    ingredients: data.ingredients.map((x) => x.description),
    comments: data.comments.map((x) => ({ userId: x.userId, text: x.text, createdAt: x.createdAt, username: x.user.username, id: x.id } as RecipeCommentDto)),
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

export const createRecipeComment = async (userId: string, text: string, recipeId: string): Promise<void> => {
  await prisma.recipeComment.create({
    data: {
      text,
      userId,
      recipeId,
    },
  });
};
export const deleteRecipeComment = async (id: string, userId: string) => {
  const comment = await prisma.recipeComment.findFirst({
    where: {
      id: id,
      userId: userId,
    },
  });
  if (comment != undefined) {
    await prisma.recipeComment.delete({
      where: {
        id: id,
      },
    });
  }
};
