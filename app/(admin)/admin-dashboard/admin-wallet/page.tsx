import React from 'react'
import WalletConnect from './WalletConnect'
import Registry from './Registry'

const Page: React.FC = () => {
    return (
        <div>
            <WalletConnect />
            <Registry />
        </div>
    )
}

export default Page