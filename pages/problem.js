import Header from '../components/header'
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
    }
}

const Problem = ({ problem }) => {

    return (
        <div>
            <Header></Header>
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
                <div className="p-5">
                    {problem.description}
                </div>
            </div>
        </div>
    )
}

export default Problem;
