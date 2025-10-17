export interface Recipe {
  id: string;
  name: string;
  description: string;
  type: string;

  ingredients: string[];
  steps: string[];

  servings: number;
  prepTime: number;
  cookTime: number;
  recipeSaved: boolean;
  ovenTemp?: number;

  image: string;
}
