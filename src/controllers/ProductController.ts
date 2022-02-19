import {Request, Response} from "express";
import {Products} from "@prisma/client";
import IPaginatedList from "../interfaces/paginated-list";
import {StatusCodes} from "http-status-codes";
import {matchedData} from "express-validator";
import ProductService from "../services/product-service";
import Logger from  "../helpers/logger";

export default class ProductController {

  static async list(req: Request, res: Response): Promise<void> {
    const pageSize = Number(req.query.pageSize),
        currentPage = Number(req.query.currentPage);

    const totalItems = await ProductService.count();
    const paginatedList: IPaginatedList<Products> = {
        pageSize, currentPage,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
        contentList: await ProductService.list(currentPage, pageSize)
    };

    res.send(paginatedList);
}

static async findById(req: Request, res: Response): Promise<void> {
  const {id} = req.params;
  res.send(await ProductService.findById(Number(id)));
}

static async create(req: Request, res: Response): Promise<void> {
  let bodyData = matchedData(req, {locations: ['body']}); // Get only validated params
  const {name, price, categoryId} = req.body;
  const user = await ProductService.create(name, price, categoryId);
  res.status(StatusCodes.CREATED).send(user);
}

static async delete(req: Request, res: Response): Promise<void> {
  const {id} = req.params;
  const product = await ProductService.findById(Number(id));
  res.send(await ProductService.delete(product.id));
}

static async findByCategory(req: Request, res: Response): Promise<void> {
  const {id} = req.params;
  Logger.info(`The categoryId is::::${id}`);
  res.send(await ProductService.findByCategory(Number(id)));
}

}