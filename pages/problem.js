import Header from '../components/header';
import Submit from "../components/submit"
import { prisma } from "../src/db";
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useCookies } from "react-cookie";

export async function getServerSideProps(ctx) {
    const query = ctx.query;
    const problem = await prisma.problem.findUnique({
        where: {
            id: parseInt(query.p)
        }
    });
    return {
        props: {
            problem,
            id: query.p,
            context: query.ctx
        }
    };
}

const Problem = ({ problem, id, context}) => {

    const [cookie, setCookie] = useCookies(["user"]);
    const user = cookie.user;

    const example_cases = JSON.parse(problem.example_cases);
    console.log(example_cases);

    return (
        <>
            <Header/>
            <div className="p-3">
                <div className="flex-col">
                    <span className="text-4xl px-2">
                        <span className="rounded bg-gray-200 px-2">
                            {problem.name}
                        </span>
                    </span>
                    <span className="text-4xl px-2">
                        <span className="rounded bg-blue-400 px-2">
                                points: {problem.points}
                        </span>
                    </span>
                    <span className="text-4xl px-2">
                        <span className="rounded bg-blue-400 px-2">
                                difficulty: {problem.difficulty}
                        </span>
                    </span>
                </div>
                <div className="flex mb-4 pt-4 text-xl">
                    <div className="grow bg-gray-50">
                        <div className="font-extrabold">description</div>
                        <MathJaxContext config={{
                            loader: {load: [
                                "[tex]/cancel",
                                "[tex]/ams"
                            ]},
                            tex: {packages: {
                                '[+]': [
                                    "cancel",
                                    "amsmath",
                                    "amssymb",
                                    "amsthm"
                                ]
                            }}
                        }}>
                            <MathJax>{problem.description}</MathJax>
                        </MathJaxContext>
                    </div>
                    <div className="grow bg-gray-100">
                        <div className="font-extrabold">example inputs</div>
                        {
                            example_cases.case0.inputs.map((input, index) => (<span key={index}>{"⇛ \""}{example_cases.case0.inputs[index]}{"\""}<br/></span>))
                        }
                        <div className="font-extrabold">example outputs</div>
                        {
                            example_cases.case0.outputs.map((output, index) => (<span key={index}>{"⇛ \""}{example_cases.case0.outputs[index]}{"\""}<br/></span>))
                        }
                    </div>
                    <div className="grow bg-gray-50">
                        <div className="font-extrabold">submissions</div>
                        {/* fancy multer form data thingy, no idea how it works i got this off stack overflow */}
                        <form className="py-2" action={"/api/upload?p=" + id + "&u=" + user} method="post" encType="multipart/form-data">
                            <input type="file" name="uploaded_file"></input>
                            <Submit></Submit>
                            <div>
                                {context == "graded_true" ? <span className="bg-green-500 rounded px-2 text-2xl">Correct</span> : null}
                                {context == "graded_false" ? <span className="bg-red-500 rounded px-2 text-2xl">Incorrect</span> : null}
                                {context == "error" ? <span className="bg-red-500 rounded px-2 text-2xl">Error</span> : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Problem;
