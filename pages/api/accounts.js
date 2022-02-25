import { PrismaClient } from "@prisma/client";

export default function accounts(req, res) {
  const prisma = new PrismaClient();
  prisma.account
    .findMany()
    .then((accounts) => {
      res.json(accounts);
    })
    .catch((err) => {
      res.json(err);
    });
}
