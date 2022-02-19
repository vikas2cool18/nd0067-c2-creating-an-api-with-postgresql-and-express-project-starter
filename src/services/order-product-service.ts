import prisma from "../helpers/prisma";
import {Orders_Products, Prisma} from "@prisma/client";
import {InternalServerErrorException, NotFoundException} from "../exceptions/http-exceptions";

export default class OrderProductService {

  static async list(currentPage: number = 0, pageSize: number = 10): Promise<Orders_Products[]> {
    return prisma.orders_Products.findMany({
        skip: pageSize * currentPage,
        take: pageSize
    });
}

  static async addProduct(quantity: number, order_id: number, product_id: number): Promise<Orders_Products> {
    const orderProduct = await prisma.orders_Products.create({
      data: {
        quantity,
        order_id,
        product_id
      }
    })
    return orderProduct;
  }

  static async delete(id: number): Promise<Orders_Products> {
    
    const orderProduct = await prisma.orders_Products.delete({
      where: {
        id: Number(id),
      },
    });
    return orderProduct;
}

}