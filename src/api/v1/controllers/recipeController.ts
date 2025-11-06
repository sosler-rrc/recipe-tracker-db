import "reflect-metadata";
import { Request, Response } from "express";
import * as RecipeService from "../services/recipeService";
import { errorResponse, successResponse } from "../models/responseModel";
import { Controller, Delete, Get, Param, Post, Put, Req, Res, UseBefore } from "routing-controllers";
import { recipeSchema } from "../validations/recipeValidation";
import { validateRequest } from "../middleware/validate";
import { getAuth, requireAuth } from "@clerk/express";

@Controller()
@UseBefore(requireAuth())
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
  @Get("/user-recipes")
  async getAllUserRecipes(@Req() req: Request, @Res() res: Response) {
    try {
      const auth = getAuth(req);
      const userId = auth.userId;
      if (!userId) {
        res.status(403).json(errorResponse("Cannot fetch user recipes, userId is not set"));
      } else {
        const recipes = await RecipeService.fetchAllUserRecipes(userId);
        return res.status(200).json(successResponse(recipes, "Recipes retrieved successfully"));
      }
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
      const auth = getAuth(req);
      const userId = auth.userId ?? "";
      const newRecipe = await RecipeService.createRecipe(req.body, userId);
      res.status(201).json(successResponse(newRecipe, "Recipe created succesfully"));
    } catch (error) {
      throw error;
    }
  }

  @Put("/recipes/update/:id")
  @UseBefore(validateRequest(recipeSchema))
  async updateRecipe(@Param("id") id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const auth = getAuth(req);
      const userId = auth.userId;
      if (userId != req.body.userid) {
        res.status(403).json(errorResponse("Cannot update recipe, userId does not match"));
      } else {
        const updatedRecipe = await RecipeService.updateRecipe(id, req.body);
        res.status(201).json(successResponse(updatedRecipe, "Recipe updated succesfully"));
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete("/recipes/delete/:id")
  async deleteRecipe(@Param("id") id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const auth = getAuth(req);
      const userId = auth.userId;
      if (userId != req.body.userid) {
        res.status(403).json(errorResponse("Cannot delete recipe, userId does not match"));
      } else {
        await RecipeService.deleteRecipe(id);
        res.status(200).json(successResponse(null, "Recipe deleted succesfully"));
      }
    } catch (error) {
      throw error;
    }
  }
}
