import express from "express"
import GeneralValidation from "../validations/shared/general-validation";
import OrderController from "../controllers/OrderController";
import {verifyAuthToken} from "../middlewares/auth";
import OrderValidation from "../validations/order-validation";

const orderRouter = (app: express.Application): void => {
  app.get(
      '/order',
      verifyAuthToken,
      GeneralValidation.paginatedList,
      OrderController.list
  );
  
  app.get(
      '/order/:id',
      verifyAuthToken,
      GeneralValidation.onlyIdParam,
      OrderController.findById
  );
  
  app.post(
      '/order',
      verifyAuthToken,
      OrderValidation.create,
      OrderController.create
  );
  
  app.delete(
      '/order/:id',
      verifyAuthToken,
      GeneralValidation.onlyIdParam,
      OrderController.delete
  );
  
  app.post(
    '/orders-current-by-userid',
    verifyAuthToken,
    OrderController.findCurrentByUserId
  );

  app.post(
    '/orders-complete-by-userid',
    verifyAuthToken,
    OrderController.showCompleteByUserId
  );

  app.post(
    '/order/complete',
    verifyAuthToken,
    OrderController.setComplete
);

  }
  
  export default orderRouter;