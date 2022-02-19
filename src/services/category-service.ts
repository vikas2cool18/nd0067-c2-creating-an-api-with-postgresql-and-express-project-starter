import prisma from "../helpers/prisma";
import {Categories, Prisma} from "@prisma/client";
import {InternalServerErrorException, NotFoundException} from "../exceptions/http-exceptions";

export default class CategoryService {

  static async count(): Promise<number> {
    return prisma.categories.count({
  });
  }

  static async list(currentPage: number = 0, pageSize: number = 10): Promise<Categories[]> {
    return prisma.categories.findMany({
        skip: pageSize * currentPage,
        take: pageSize
    });
}

  static async findById(id: number): Promise<Categories> {
    const category = await prisma.categories.findFirst({
      where: {
        id: Number(id),
      }
    });
    if (!category) {
      throw new NotFoundException(id.toString());
  }

  return category;
}

  static async create(name: string) {
    const category = await prisma.categories.create({
      data: {
        name,
      }
    });
  
    return category;
  }

  static async delete(id: number): Promise<Categories> {
    
      const category = await prisma.categories.delete({
        where: {
          id: Number(id),
        },
      });
      return category;
  }

}