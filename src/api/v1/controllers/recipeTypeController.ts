import "reflect-metadata";
import { Request, Response } from "express";
import * as RecipeTypeService from "../services/recipeTypeService";
import { successResponse } from "../models/responseModel";
import { Controller, Delete, Get, Param, Post, Put, Req, Res, UseBefore } from "routing-controllers";

@Controller()
export class RecipeTypeController {
  @Get("/recipeTypes")
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      const recipes = await RecipeTypeService.fetchAllRecipeTypes();
      return res.status(200).json(successResponse(recipes, "RecipeTypes retrieved successfully"));
    } catch (error) {
      throw error;
    }
  }

  @Get("/recipeTypes/{id}")
  async getById(@Param("id") id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const recipes = await RecipeTypeService.getRecipeTypeById(id);
      return res.status(200).json(successResponse(recipes, "RecipeTypes successfully deleted"));
    } catch (error) {
      throw error;
    }
  }

  @Post("/recipeTypes")
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const recipeType = await RecipeTypeService.createRecipeType(req.body);
      return res.status(200).json(successResponse(recipeType, "RecipeTypes created successfully"));
    } catch (error) {
      throw error;
    }
  }

  @Delete("/recipeTypes/{id}")
  async delete(@Param("id") id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const recipes = await RecipeTypeService.deleteRecipeType(id);
      return res.status(200).json(successResponse(recipes, "RecipeTypes successfully deleted"));
    } catch (error) {
      throw error;
    }
  }

  @Put("/recipeTypes/{id}")
  async update(@Param("id") id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const recipeType = await RecipeTypeService.updateRecipeType(id, req.body);
      return res.status(200).json(successResponse(recipeType, "RecipeTypes updated successfully"));
    } catch (error) {
      throw error;
    }
  }
}
