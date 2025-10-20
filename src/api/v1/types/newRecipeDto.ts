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
  saved: boolean;
  ovenTemp?: number;
}
