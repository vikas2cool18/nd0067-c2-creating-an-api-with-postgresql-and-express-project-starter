import express from "express"
import GeneralValidation from "../validations/shared/general-validation";
import CategoryController from "../controllers/CategoryController";
import {verifyAuthToken} from "../middlewares/auth";
import CategoryValidation from "../validations/category-validation";

const categoryRouter = (app: express.Application): void => {
  app.get(
      '/category',
      verifyAuthToken,
      GeneralValidation.paginatedList,
      CategoryController.list
  );
  
  app.get(
      '/category/:id',
      verifyAuthToken,
      GeneralValidation.onlyIdParam,
      CategoryController.findById
  );
  
  app.post(
      '/category',
      verifyAuthToken,
      CategoryValidation.create,
      CategoryController.create
  );
  
  app.delete(
      '/category/:id',
      verifyAuthToken,
      GeneralValidation.onlyIdParam,
      CategoryController.delete
  );
  }
  
  export default categoryRouter;