import React from 'react'

const Registry = () => {
    return (
        <div>
            <h1 className=' mt-13 mb-8 text-[40px] text-[#1F2937] font-semibold ' >User Position Registry</h1>
            <div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">

                            {/* Table Head */}
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        User Wallet
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Market Title
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Position
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Timestamp
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-100">

                                {/* Example Row */}
                                <tr className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-700">
                                        0xC191...6884
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                                        Will Bitcoin hit $100k before Q1 2026?
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-600">
                                            YES
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                        0.001 ETH
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        Feb 23, 2026 10:18 AM
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registry