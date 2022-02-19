import {NextFunction, Request, RequestHandler, Response} from "express";
import {ValidationChain, validationResult} from 'express-validator';
import {BadRequestException} from "../exceptions/http-exceptions";
import Logger from "../helpers/logger"
export type ValidationMiddleware = [...ValidationChain[], RequestHandler]

/**
 * Validate the input parameters from ValidationChain
 * and sent a BadRequest if parameters are invalid
 * @param chains the ValidationChain
 */
export default function validationMiddleware(chains: ValidationChain[]): ValidationMiddleware {
    return [
        ...chains,
        (req: Request, res: Response, next: NextFunction): void => {
            const {categoryId} = req.params;
            Logger.info(`The categoryId is::::${categoryId}`);
            const errors = validationResult(req);
            Logger.info(`Error Message:::::${errors}`);
            if (!errors.isEmpty()) {
                throw new BadRequestException(errors.array())
            }
            next();
        }
    ];
}