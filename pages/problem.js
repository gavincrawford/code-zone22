import Header from '../components/header';
import { PrismaClient } from '@prisma/client';

export async function getServerSideProps(ctx) {
    const query = ctx.query;
    const prisma = new PrismaClient();
    const problem = await prisma.problem.findUnique({
        where: {
            id: parseInt(query.p)
        }
    });
    return {
        props: {
            problem
        }
    };
}

const Problem = ({ problem }) => (
    <>
        <Header/>
        <div className="p-4">
            <div className="flex-col">
                <span className="text-4xl px-5">
                    <span className="rounded-full bg-gray-200 px-4">
                        {problem.name}
                    </span>
                </span>
                <span className="text-4xl px-5">
                    <span className="rounded-full bg-blue-400 px-4">
                            points: {problem.points}
                    </span>
                </span>
                <span className="text-4xl px-5">
                    <span className="rounded-full bg-blue-400 px-4">
                            difficulty: {problem.difficulty}
                    </span>
                </span>
            </div>
            <div className="flex mb-4 pt-4 text-xl">
                <div className="grow bg-gray-50">
                    <div className="font-extrabold">description</div>
                    {problem.description}
                </div>
                <div className="grow bg-gray-100">
                    <div className="font-extrabold">example inputs</div>
                    {"⇛ \""}{problem.inputs}{"\""}
                    <div className="font-extrabold">example outputs</div>
                    {"⇚ \""}{problem.outputs}{"\""}
                </div>
                <div className="grow bg-gray-50">
                    <div className="font-extrabold">submissions</div>
                </div>
            </div>
        </div>
    </>
);

export default Problem;
