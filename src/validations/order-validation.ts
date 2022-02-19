import {body} from "express-validator";
import validationMiddleware from "../middlewares/validation-middleware";
import ICrudValidation from "../interfaces/crud-validation";
import {idParamChain} from "./shared/general-validation";

/** VALIDATIONS **/

const OrderValidation: ICrudValidation = {
  create: validationMiddleware([
    body('user_id').isNumeric(),
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
export default OrderValidation;