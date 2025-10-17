import "reflect-metadata";
import { Request, Response } from "express";
import * as RecipeService from "../services/recipeService";
import { errorResponse, successResponse } from "../models/responseModel";
import { Controller, Delete, Get, Param, Post, Put, Req, Res, UseBefore } from "routing-controllers";
import { recipeSchema } from "../validations/recipeValidation";
import { validateRequest } from "../middleware/validate";

@Controller()
export class RecipeController {
  @Get("/recipes")
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      const recipes = await RecipeService.fetchAllRecipes();
      return res.status(200).json(successResponse(recipes, "Recipes retrieved successfully"));
    } catch (error) {
      throw error;
    }
  }
  @Get("/recipes/:id")
  async getById(@Param("id") id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const recipe = await RecipeService.getRecipeById(id);
      if (recipe) {
        return res.status(200).json(successResponse(recipe, "Recipe retrieved successfully"));
      } else {
        return res.status(404).json(errorResponse("Recipe not found"));
      }
    } catch (error) {
      throw error;
    }
  }

  @Post("/recipes/create")
  @UseBefore(validateRequest(recipeSchema))
  async createRecipe(@Req() req: Request, @Res() res: Response) {
    try {
      const newRecipe = await RecipeService.createRecipe(req.body);
      res.status(201).json(successResponse(newRecipe, "Recipe created succesfully"));
    } catch (error) {
      throw error;
    }
  }

  @Put("/recipes/update/:id")
  @UseBefore(validateRequest(recipeSchema))
  async updateRecipe(@Param("id") id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const updatedRecipe = await RecipeService.updateRecipe(id, req.body);
      res.status(201).json(successResponse(updatedRecipe, "Recipe updated succesfully"));
    } catch (error) {
      throw error;
    }
  }

  @Delete("/recipes/delete/:id")
  async deleteRecipe(@Param("id") id: string, @Req() req: Request, @Res() res: Response) {
    try {
      await RecipeService.deleteRecipe(id);
      res.status(200).json(successResponse(null, "Recipe deleted succesfully"));
    } catch (error) {
      throw error;
    }
  }
}
