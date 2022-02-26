import { PrismaClient } from "@prisma/client";

export default function login(req, res) {
    const prisma = new PrismaClient();
    prisma.account.findUnique({
        where: {
            name: req.body.username
        }
    }).then((account) => {
        console.log(account);
        if (account.password === req.body.password) {
            res.json({success: true, account});
        } else {
            res.json({success: false, message: "Incorrect password"});
        }
    }).catch((err) => {
        res.json({success: false, message: "User not found"});
    });
};
