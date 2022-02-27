import { PrismaClient } from "@prisma/client";

export default function accounts(req, res) {
  const prisma = new PrismaClient();
  prisma.problem
    .findUnique({
        where: {
            id: req.query.p
        }
    })
    .then((problem) => {
      res.json(problem);
    })
    .catch((err) => {
      res.json(err);
    });
}
