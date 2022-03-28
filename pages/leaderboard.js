import { PrismaClient } from '@prisma/client';
import RedirectButton from '../components/button';
import Header from '../components/header';

export async function getServerSideProps(ctx) {
    // This will load server-side users, ordered by points
    const prisma = new PrismaClient();
    const accounts = await prisma.account.findMany({
        orderBy: {
            points: 'desc'
        }
    });
    return {
        props: { accounts }
    };
}

const Leaderboard = ({accounts}) => (
    <>

        {/* Header bar */}
        <Header></Header>

        {/* Server-loaded problem table */}
        <div className="flex flex-col p-4">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 content">

                                {/* Map problems to table rows */}
                                {accounts.map(account => (
                                    <tr key={account.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    {account.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {account.points}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default Leaderboard;
  