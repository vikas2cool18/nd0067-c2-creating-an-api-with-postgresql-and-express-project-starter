import {Request, Response} from "express";
import {Categories, Products} from "@prisma/client";
import IPaginatedList from "../interfaces/paginated-list";
import {StatusCodes} from "http-status-codes";
import {matchedData} from "express-validator";
import CategoryService from "../services/category-service";
import Logger from  "../helpers/logger";

export default class CategoryController {
  static async list(req: Request, res: Response): Promise<void> {
    const pageSize = Number(req.query.pageSize),
        currentPage = Number(req.query.currentPage);

    const totalItems = await CategoryService.count();
    const paginatedList: IPaginatedList<Categories> = {
        pageSize, currentPage,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
        contentList: await CategoryService.list(currentPage, pageSize)
    };

    res.send(paginatedList);
}

static async findById(req: Request, res: Response): Promise<void> {
  const {id} = req.params;
  res.send(await CategoryService.findById(Number(id)));
}

static async create(req: Request, res: Response): Promise<void> {
  let bodyData = matchedData(req, {locations: ['body']}); // Get only validated params
  const {name, price, categoryId} = req.body;
  const user = await CategoryService.create(name);
  res.status(StatusCodes.CREATED).send(user);
}

static async delete(req: Request, res: Response): Promise<void> {
  const {id} = req.params;
  const product = await CategoryService.findById(Number(id));
  res.send(await CategoryService.delete(product.id));
}
}