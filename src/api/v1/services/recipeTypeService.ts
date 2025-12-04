import prisma from "@/prisma/client";
import { RecipeType } from "@/prisma/generated/prisma";

export const fetchAllRecipeTypes = async (): Promise<RecipeType[]> => {
  return prisma.recipeType.findMany();
};

export const createRecipeType = async (data: RecipeType): Promise<RecipeType> => {
  const newRecipeType = await prisma.recipeType.create({
    data: {
      ...data,
    },
  });

  return newRecipeType;
};

export const updateRecipeType = async (id: string, recipeType: RecipeType): Promise<RecipeType> => {
  const updateRecipeType = await prisma.recipeType.update({
    where: {
      id: id,
    },
    data: {
      ...recipeType,
    },
  });
  return updateRecipeType;
};

export const deleteRecipeType = async (id: string): Promise<void> => {
  await prisma.recipeType.delete({
    where: {
      id: id,
    },
  });
};
