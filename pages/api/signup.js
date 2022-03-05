import { PrismaClient } from "@prisma/client";

export default function login(req, res) {
    const prisma = new PrismaClient();
    prisma.account.create({
        data: {
            name: req.body.username,
            password: req.body.password
        }
    }).then((account) => {
        res.json({success: true, name: account.name});
    }).catch((err) => {
        res.json({success: false, message: "Failed to create user."});
    });
}
