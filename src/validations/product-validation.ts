import {body} from "express-validator";
import validationMiddleware from "../middlewares/validation-middleware";
import ICrudValidation from "../interfaces/crud-validation";
import {idParamChain} from "./shared/general-validation";

/** VALIDATIONS **/

const ProductValidation: ICrudValidation = {
  create: validationMiddleware([
    body('name').isString(),
    body('price').isNumeric(),
    body('categoryId').isNumeric(),
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
export default ProductValidation;