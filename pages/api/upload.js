import nc from "next-connect";
import multer from "multer";
import { exec, spawn } from "child_process";
import { PrismaClient } from '@prisma/client';

async function completeProblem(problem_id, problem_pts, username) {
    const prisma = new PrismaClient();

    // Recalculate the user's points to retain accuracy
    let total_pts = problem_pts;
    const user = await prisma.account.findUnique({
        where: {
            name: username
        },
        include: {
            solved_problems: true
        }
    })
    for (let i = 0; i < user.solved_problems.length; i++) {
        total_pts += user.solved_problems[i].points;
    }

    // Update the database record for the user
    const update = await prisma.account.update({
        where: {
            name: username
        },
        data: {
            solved_problems: {
                connect: {
                    id: problem_id
                }
            },
            points: {
                set: total_pts
            }
        }
    });

    return update;
}

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

api.post(async (req, res) =>{

    const id = req.query.p;
    const name = req.query.u;

    console.log(`[+] User "${name}" attempting p${id}`);

    // Fetch information from database
    const prisma = new PrismaClient();
    const problem = await prisma.problem.findUnique({
        where: {
            id: parseInt(req.query.p)
        }
    });
    const user = await prisma.account.findUnique({
        where: {
            name: name
        }
    })


    console.log(`[+] Got file: ${req.file.filename}`);

    const proc = exec(`python3 ${req.file.path}`, {
        timeout: 1000, // 1 second
        maxBuffer: 1024 * 1024 * 10 // 10MB
    }, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            // TODO: Error traces
            res.redirect(`/problem?p=${id}&ctx=error`);
        } else {

            console.log(stdout);

            let solved = false;

            // Check if the response is correct
            if (stdout == "\"" + problem.test_case_outputs + "\"\n" || stdout == problem.test_case_outputs + "\n") {
                
                // Tell database to link problem to user, showing that the user has solved this problem.

                completeProblem(problem.id, problem.points, name);

                solved = true;
            }

            console.log("[+] Solved: " + solved);
            res.redirect(`/problem?p=${id}&ctx=graded_${solved}`); // Redirect user back to problem page

        }
    });

    proc.stdin.write(problem.test_case_inputs + "\n"); // Inputs

});

export default api;

export const config = {
    api: {
        bodyParser: false // Cosume data as stream
    }
};
