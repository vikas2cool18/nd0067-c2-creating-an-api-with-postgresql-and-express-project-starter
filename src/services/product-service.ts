import prisma from "../helpers/prisma";
import {Products, Prisma} from "@prisma/client";
import {InternalServerErrorException, NotFoundException} from "../exceptions/http-exceptions";

export default class ProductService {

  static async count(): Promise<number> {
    return prisma.products.count({
  });
  }

  static async list(currentPage: number = 0, pageSize: number = 10): Promise<Products[]> {
    return prisma.products.findMany({
        skip: pageSize * currentPage,
        take: pageSize
    });
}

  static async findById(id: number): Promise<Products> {
    const product = await prisma.products.findFirst({
      where: {
        id: Number(id),
      }
    });
    if (!product) {
      throw new NotFoundException(id.toString());
  }

  return product;
}

static async findByCategory(id: number): Promise<Products[]> {
  const products = await prisma.products.findMany({
    where: {
      categoryId: Number(id),
    }
  });
  if (!products) {
    throw new NotFoundException(id.toString());
}

return products;
}

  static async create(name: string, price: number, categoryId: number) {
    const user = await prisma.products.create({
      data: {
        name,
        price,
        categoryId
      }
    });
  
    return user;
  }

  static async delete(id: number): Promise<Products> {
    
      const product = await prisma.products.delete({
        where: {
          id: Number(id),
        },
      });
      return product;
  }
  
}