import { prisma } from "../../src/db";
import nc from "next-connect";

const api = nc({
    onError: (req, res, err) => {
        console.log(err.stack);
        res.status(500).json({ statusCode: 500, message: "Uh oh! Something broke. Tell the devs, we'll fix it as soon as we can." });
    },
    onNoMatch: (req, res) => {
        res.status(404).json({ statusCode: 404, message: "Uh oh! We couldn't find the page you were looking for." });
    }
});

api.post((req, res) => {
    prisma.account.create({
        data: {
            name: req.body.username,
            password: req.body.password
        }
    }).then((account) => {
        res.status(200).json({success: true, name: account.name});
    }).catch((err) => {
        res.status(200).json({success: false, message: "Failed to create user."});
    }); 
});

export default api;
