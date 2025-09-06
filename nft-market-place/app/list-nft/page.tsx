// app/list-nft/page.tsx
"use client"

import { usePrivy } from "@privy-io/react-auth"
import { chainsToContracts } from "@/constants"
import ListNftForm from "@/components/ListNftForm"

export default function ListNftPage() {
    const { authenticated, user } = usePrivy()
    const chainSupported =
        user?.wallet?.chainId && 
        user.wallet.chainId in chainsToContracts && 
        chainsToContracts[user.wallet.chainId]?.nftMarketplace !== undefined

    console.log(`user?.wallet?.chainId: ${user?.wallet?.chainId}`)
   
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">
                        List Your NFT for Sale
                    </h1>

                    {/* Connection Status */}
                    {!authenticated ? (
                        <div className="p-8 bg-white rounded-xl shadow-sm border border-zinc-200 text-center">
                            <p className="text-lg text-zinc-600 mb-4">
                                Connect your wallet to list your NFT
                            </p>
                            <p className="text-sm text-zinc-500">
                                Please use the Connect Wallet button in the header
                            </p>
                        </div>
                    ) : !chainSupported ? (
                        <div className="p-8 bg-white rounded-xl shadow-sm border border-zinc-200 text-center">
                            <p className="text-lg text-red-600 mb-4">
                                The current network is not supported. Please switch to a supported
                                network.
                            </p>
                            <p className="text-sm text-zinc-500">
                                Supported networks: Anvil, Sepolia, Mainnet {user?.wallet?.chainId}
                            </p>
                        </div>
                    ) : (
                        <ListNftForm />
                    )}
                </div>
            </main>

            <footer className="bg-white border-t border-zinc-200 py-4">
                <div className="container mx-auto px-4">
                    <p className="text-center text-zinc-500 text-sm">
                        NFT Marketplace • Built with Next.js, Privy, and Viem
                    </p>
                </div>
            </footer>
        </div>
    )
}
