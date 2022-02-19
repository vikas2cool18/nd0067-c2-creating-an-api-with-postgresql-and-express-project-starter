import {Request, Response} from "express";
import {Users} from "@prisma/client";
import IPaginatedList from "../interfaces/paginated-list";
import {StatusCodes} from "http-status-codes";
import {matchedData} from "express-validator";
import UserService from "../services/user-service";
import Logger from  "../helpers/logger";

export default class UserController {
    static async authenticate(req: Request, res: Response): Promise<string> {
      try {
        Logger.info(`request::::${req.body.first_name}`);
        const token = await UserService.authenticate(req.body.first_name, req.body.last_name, req.body.password_digest);
        Logger.info(`token::::${token}
        `);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
    return "";
    }

    static async list(req: Request, res: Response): Promise<void> {
        const pageSize = Number(req.query.pageSize),
            currentPage = Number(req.query.currentPage);

        const totalItems = await UserService.count();
        const paginatedList: IPaginatedList<Users> = {
            pageSize, currentPage,
            totalPages: Math.ceil(totalItems / pageSize),
            totalItems,
            contentList: await UserService.list(currentPage, pageSize)
        };

        res.send(paginatedList);
    }

    static async findById(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        res.send(await UserService.findById(Number(id)));
    }

    static async create(req: Request, res: Response): Promise<void> {
        let bodyData = matchedData(req, {locations: ['body']}); // Get only validated params
        const {first_name, last_name, password_digest} = req.body;
        const user = await UserService.create(first_name, last_name, password_digest);
        res.status(StatusCodes.CREATED).send(user);
    }

    static async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const user = await UserService.findById(Number(id));
        res.send(await UserService.delete(user.id));
    }
}