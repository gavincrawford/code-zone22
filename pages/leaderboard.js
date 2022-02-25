import { PrismaClient } from '@prisma/client'
import RedirectButton from '../components/button'

export async function getStaticProps() {
    // This will load server-side users, ordered by points
    const prisma = new PrismaClient();
    const accounts = await prisma.account.findMany({
        orderBy: {
            points: 'desc'
        }
    });
    return {
      props: { accounts }
    }
  }

const Leaderbord = ({accounts}) => {
    return (
        <div>
            {/* Header bar */}
            <div className="flex flex-col w-screen">
                <div className="text-size-4 bg-gray-200 text-black hover:bg-gray-500 hover:text-white transition-all p-2">
                <span className="px-6">CODE_COMP</span>
                {/* Buttons */}
                <RedirectButton href="/leaderboard">leaderboard</RedirectButton>
                <RedirectButton href="/solutions">solutions</RedirectButton>
                <RedirectButton href="/">problems</RedirectButton>
                </div>
            </div>

            {/* Server-loaded problem table */}
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                            <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 content">

                        {/* Map problems to table rows */}
                        {accounts.map(account => {
                            return (
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
                            );
                        })}

                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderbord;
