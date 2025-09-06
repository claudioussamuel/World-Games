"use client"

import { usePrivy } from "@privy-io/react-auth"
import RecentlyListedNFTs from "@/components/RecentlyListed"

export default function Home() {
    const { authenticated } = usePrivy()

    return (
        <main>
            {!authenticated ? (
                <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
                    Please connect a wallet
                </div>
            ) : (
                <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
                    <RecentlyListedNFTs />
                </div>
            )}
        </main>
    )
}
