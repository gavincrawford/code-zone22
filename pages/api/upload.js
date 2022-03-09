import nc from "next-connect";
import multer from "multer";


const upload = multer({
    dest: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 10000
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(py|pyc|txt)$/)) {
            return cb(new Error("Only .py, .pyc and .txt files are allowed!"), false);
        }
        cb(null, true);
    }
});

const api = nc({
    onError: (req, res, err) => {
        console.log(err.stack);
        res.status(500).json({ statusCode: 500, message: "Uh oh! Something broke. Tell the devs, we'll fix it as soon as we can." });
    },
    onNoMatch: (req, res) => {
        res.status(404).json({ statusCode: 404, message: "Uh oh! We couldn't find the page you were looking for." });
    }
});

api.use(upload.single("uploaded_file"));

api.post((req, res) => {
    res.status(200).json({ statusCode: 200, message: "Uploaded file!" });
});

export default api;

export const config = {
    api: {
        bodyParser: false // Cosume data as stream
    }
}
