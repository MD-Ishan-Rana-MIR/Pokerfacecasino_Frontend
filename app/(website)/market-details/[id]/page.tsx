import React from 'react'
import MarketDetails from './MarketDetails';

const Page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    return (
        <div>

            <MarketDetails id={id} />
        </div>
    )
}

export default Page