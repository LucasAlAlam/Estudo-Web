import { PrismaClient, Prisma } from "@prisma/client";
import { Response, Request } from "express";
import auth from "../config/auth";

const prisma = new PrismaClient();

class UserController {
    async create(req: Request, res: Response) {
        try {
            const { email, password, jobTitle, department } = req.body;
            const { hash, salt } = auth.generatePassword(password);
            let userInput: Prisma.UserCreateInput = {
                email: email,
                jobTitle: jobTitle,
                department: department,
                hash: hash,
                salt: salt,
            };
            const user = await prisma.user.create({
                data: userInput,
            });
            return res.status(201).json({
                message: "Cliente criado com sucesso",
                data: {
                    email: email,
                    token: auth.generateJWT(user),
                },
            });
        } catch (error: any) {
            return res.status(500).json(error);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const user = await prisma.user.findUnique({
                where: { email: req.body.email },
            });
            if (!user)
                return res.status(404).json({ message: "Usuário não encontrado." });
            const { password } = req.body;
            if (auth.checkPassword(password, user.hash, user.salt)) {
                const token = auth.generateJWT(user);
                return res.status(200).json({ token: token });
            } else {
                return res.status(401).json({ message: "Senha inválida." });
            }
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }

    async show(req: Request, res: Response) {
        try {
          if (!req.user)
            return res.status(400).json({ message: "Erro no token" });
          const user = await prisma.user.findUnique({
            where: {
              id: Number(req.user)
            }
          });
          if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
          }
          delete user.hash;
          delete user.salt;
          return res.status(200).json({ user: user });
        } catch (error) {
          return res.status(500).json({ error: error });
        }
      }
}

export default new UserController();