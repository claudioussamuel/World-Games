"use client"

import { useState } from "react"
import CakeNft from "@/components/CakeNft"
import { usePrivy } from "@privy-io/react-auth"
import { RiCakeLine } from "react-icons/ri"
import { chainsToContracts } from "@/constants"

export default function Home() {
    const { authenticated, user } = usePrivy()
    const chainSupported =
        user?.wallet?.chainId && 
        user.wallet.chainId in chainsToContracts && 
        chainsToContracts[user.wallet.chainId]?.cakeNft !== undefined

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Connection Status */}
                    {!authenticated ? (
                        <div className="p-8 bg-white rounded-xl shadow-sm border border-zinc-200 text-center">
                            <p className="text-lg text-zinc-600 mb-4">
                                Connect your wallet to interact with the Cake NFT contract
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
                                Supported networks: Anvil, Sepolia, Mainnet
                            </p>
                        </div>
                    ) : (
                        <CakeNft />
                    )}
                </div>
            </main>

            <footer className="bg-white border-t border-zinc-200 py-4">
                <div className="container mx-auto px-4">
                    <p className="text-center text-zinc-500 text-sm">
                        Cake NFT Bakery • Built with Next.js, Privy, and Viem
                    </p>
                </div>
            </footer>
        </div>
    )
}
