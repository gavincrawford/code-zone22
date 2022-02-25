import { PrismaClient } from "@prisma/client";

export default function accounts(req, res) {
  const prisma = new PrismaClient();
  prisma.problem
    .findMany()
    .then((problems) => {
      res.json(problems);
    })
    .catch((err) => {
      res.json(err);
    });
}
