import { RecipeCommentDto } from "./recipeCommentDto";

export interface RecipeDto {
  id?: string;
  name: string;
  description: string;
  recipeTypeId: string;

  ingredients: string[];
  steps: string[];

  servings: number;
  prepTime: number;
  cookTime: number;
  ovenTemp?: number;
  updatedAt: Date;
  createdAt: Date;
  userId: string;

  comments: RecipeCommentDto[];
}
