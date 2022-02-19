

import express from "express";
import UserValidation from "../validations/user-validation";
import GeneralValidation from "../validations/shared/general-validation";
import UserController from "../controllers/UserController";
import {verifyAuthToken} from "../middlewares/auth";

const userRouter = (app: express.Application): void => {
app.get(
    '/user',
    verifyAuthToken,
    GeneralValidation.paginatedList,
    UserController.list
);

app.get(
    '/user/:id',
    verifyAuthToken,
    GeneralValidation.onlyIdParam,
    UserController.findById
);

app.post(
    '/user',
    UserValidation.create,
    UserController.create
);

app.delete(
    '/user/:id',
    verifyAuthToken,
    GeneralValidation.onlyIdParam,
    UserController.delete
);

app.post(
  '/user/authenticate',
  UserController.authenticate
);
}

export default userRouter;