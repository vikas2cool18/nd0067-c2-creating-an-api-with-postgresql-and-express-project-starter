import prisma from "../helpers/prisma";
import {Orders, Prisma} from "@prisma/client";
import {InternalServerErrorException, NotFoundException} from "../exceptions/http-exceptions";

export default class OrderService {

  static async count(): Promise<number> {
    return prisma.orders.count({
  });
  }

  static async list(currentPage: number = 0, pageSize: number = 10): Promise<Orders[]> {
    return prisma.orders.findMany({
        skip: pageSize * currentPage,
        take: pageSize
    });
}

  static async findById(id: number): Promise<Orders> {
    const order = await prisma.orders.findFirst({
      where: {
        id: Number(id),
      }
    });
    if (!order) {
      throw new NotFoundException(id.toString());
  }

  return order;
}

static async findCurrentByUserId(user_id: number): Promise<Orders> {
  const order = await prisma.orders.findFirst({
    where: {
      user_id: Number(user_id),
      status: 'active'
    }
  });
  if (!order) {
    throw new NotFoundException(user_id.toString());

  }
  return order;  
    
}

static async findCompleteByUserId(user_id: number): Promise<Orders[]> {
  const order = await prisma.orders.findMany({
    where: {
      user_id: Number(user_id),
      status: 'complete'
    }
  });
  if (!order) {
    throw new NotFoundException(user_id.toString());
}

return order;
}

  static async create(user_id: number) {
    const category = await prisma.orders.create({
      data: {
        user_id,
        status : 'active'
      }
    });
  
    return category;
  }

  static async delete(id: number): Promise<Orders> {
    
      const category = await prisma.orders.delete({
        where: {
          id: Number(id),
        },
      });
      return category;
  }

  static async updateStatusToComplete(id: number): Promise<Orders> {
    const order = prisma.orders.update({
      where: {
        id: Number(id),
      },
      data: {
        status: 'complete'
      },
    });
return order;
  }

}