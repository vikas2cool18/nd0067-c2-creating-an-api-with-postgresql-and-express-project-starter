import {Request, Response} from "express";
import {Orders} from "@prisma/client";
import IPaginatedList from "../interfaces/paginated-list";
import {StatusCodes} from "http-status-codes";
import {matchedData} from "express-validator";
import OrderService from "../services/order-service";
import Logger from  "../helpers/logger";

export default class OrderController {

  static async list(req: Request, res: Response): Promise<void> {
    const pageSize = Number(req.query.pageSize),
        currentPage = Number(req.query.currentPage);

    const totalItems = await OrderService.count();
    const paginatedList: IPaginatedList<Orders> = {
        pageSize, currentPage,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
        contentList: await OrderService.list(currentPage, pageSize)
    };

    res.send(paginatedList);
}

static async findById(req: Request, res: Response): Promise<void> {
  const {id} = req.params;
  res.send(await OrderService.findById(Number(id)));
}

static async create(req: Request, res: Response): Promise<void> {
  let bodyData = matchedData(req, {locations: ['body']}); // Get only validated params
  const {user_id} = req.body;
  const order = await OrderService.create(user_id);
  res.status(StatusCodes.CREATED).send(order);
}

static async delete(req: Request, res: Response): Promise<void> {
  const {id} = req.params;
  const order = await OrderService.findById(Number(id));
  res.send(await OrderService.delete(order.id));
}

static async setComplete (req: Request, res: Response): Promise<void> {
  const {id} = req.body;
  res.send(await OrderService.updateStatusToComplete(Number(id)));
}

static async showCompleteByUserId(req: Request, res: Response): Promise<void> {
  const {user_id} = req.body;
  res.send(await OrderService.findCompleteByUserId(Number(user_id)));
}

static async findCurrentByUserId(req: Request, res: Response): Promise<void> {
  const {user_id} = req.body;
  res.send(await OrderService.findCurrentByUserId(Number(user_id)));
}


}