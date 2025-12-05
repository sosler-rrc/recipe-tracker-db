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
}
