import express from "express"
import GeneralValidation from "../validations/shared/general-validation";
import ProductController from "../controllers/ProductController";
import {verifyAuthToken} from "../middlewares/auth";
import ProductValidation from "../validations/product-validation";

const productRouter = (app: express.Application): void => {
  app.get(
      '/product',
      verifyAuthToken,
      GeneralValidation.paginatedList,
      ProductController.list
  );
  
  app.get(
      '/product/:id',
      verifyAuthToken,
      GeneralValidation.onlyIdParam,
      ProductController.findById
  );
  
  app.post(
      '/product',
      verifyAuthToken,
      ProductValidation.create,
      ProductController.create
  );
  
  app.delete(
      '/product/:id',
      verifyAuthToken,
      GeneralValidation.onlyIdParam,
      ProductController.delete
  );
  
  app.get(
    '/product/category/:id',
    verifyAuthToken,
    GeneralValidation.onlyIdParam,
    ProductController.findByCategory
  );
  }
  
  export default productRouter;