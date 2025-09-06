"use client"

import { usePrivy } from "@privy-io/react-auth"
import RecentlyListedNFTs from "@/components/RecentlyListed"

export default function Home() {
    // Check if Privy is available
    const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
    let authenticated = false
    
    // Only use Privy hooks if app ID is available
    if (privyAppId) {
        const privy = usePrivy()
        authenticated = privy.authenticated
    }

    return (
        <main>
            {!privyAppId ? (
                <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">NFT Marketplace</h1>
                        <p className="text-gray-600 mb-4">Privy app ID not configured</p>
                        <p className="text-sm text-gray-500">
                            Please set NEXT_PUBLIC_PRIVY_APP_ID environment variable
                        </p>
                    </div>
                </div>
            ) : !authenticated ? (
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
