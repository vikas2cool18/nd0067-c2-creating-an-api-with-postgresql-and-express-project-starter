import prisma from "../helpers/prisma";
import {Users, Prisma} from "@prisma/client";
import {InternalServerErrorException, NotFoundException} from "../exceptions/http-exceptions";
import bcrypt from 'bcrypt';
const { BCRYPT_PEPPER, BCRYPT_SALT_ROUNDS } = process.env;
const saltRounds = BCRYPT_SALT_ROUNDS as string;
const pepper = BCRYPT_PEPPER as string;
import jwt from 'jsonwebtoken';
import Logger from "../helpers/logger";

export default class UserService {

  static async count(): Promise<number> {
    return prisma.users.count({
  });
  }

  static async list(currentPage: number = 0, pageSize: number = 10): Promise<Users[]> {
    return prisma.users.findMany({
        skip: pageSize * currentPage,
        take: pageSize
    });
}

  static async findById(id: number): Promise<Users> {
    const user = await prisma.users.findFirst({
      where: {
        id: Number(id),
      }
    });
    if (!user) {
      throw new NotFoundException(id.toString());
  }

  return user;
}

  static async create(first_name: string, last_name: string, password_digest: string) {
    const hash = bcrypt.hashSync(password_digest + pepper, parseInt(saltRounds))
    const user = await prisma.users.create({
      data: {
        first_name,
        last_name,
        password_digest: hash
      }
    });
  
    return user;
  }

  static async delete(id: number): Promise<Users> {
    
      const user = await prisma.users.delete({
        where: {
          id: Number(id),
        },
      });
      return user;
  }

  static async authenticate(first_name: string, last_name: string, password_digest: string): Promise<string | null> {
    const user = await prisma.users.findFirst({
      where: {
        first_name: String(first_name),
        last_name: String(last_name)
      }
    });
    Logger.info(`User::::${user?.first_name}`)
    try {
      if (user) {
        Logger.info(`Inside User::::${user?.first_name}`)
        if (bcrypt.compareSync(password_digest + pepper, user.password_digest)) {
          Logger.info(`Inside Token::::${user?.first_name}`)
          const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
          Logger.info(`Token::::${token}`)
          return token;
      } else {
        return null;
      }
    }
    } catch (error) {
      Logger.info(`Error::::${error}`)
    }
    
  return null;
  }

}
