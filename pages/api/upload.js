import nc from "next-connect";
import multer from "multer";
import { exec, spawn } from "child_process";


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
        res.statusCode = 500;
        res.statusMessage = "Oops, something went wrong!";
    },
    onNoMatch: (req, res) => {
        res.statusCode = 404;
        res.statusMessage = "Not found!";
    }
});

api.use(upload.single("uploaded_file"));

api.post((req, res) => {
    console.log(`[+] Got file: ${req.file.filename}`);
    exec(`python ${req.file.path}`, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            res.status(500).json({ statusCode: 500, message: "Your script failed to run." }); // TODO: Error traces
        } else {
            console.log(stdout);
            res.status(200).json({ statusCode: 200, message: stdout });
        }
    });
    // TODO: Add submission to database
});

export default api;

export const config = {
    api: {
        bodyParser: false // Cosume data as stream
    }
};
