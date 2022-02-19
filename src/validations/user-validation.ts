import {body} from "express-validator";
import validationMiddleware from "../middlewares/validation-middleware";
import ICrudValidation from "../interfaces/crud-validation";
import {idParamChain} from "./shared/general-validation";

/** VALIDATIONS **/

const UserValidation: ICrudValidation = {
  create: validationMiddleware([
    body('first_name').isString(),
    body('last_name').isString(),
    body('password_digest').isString(),
  ]),
  list: validationMiddleware([
    idParamChain,

    body('pageSize').isNumeric(),
    body('currentPage').isNumeric(),
  ]),
  findById:  validationMiddleware([
    idParamChain
  ]),
  delete:  validationMiddleware([
    idParamChain
  ]),
};
export default UserValidation;