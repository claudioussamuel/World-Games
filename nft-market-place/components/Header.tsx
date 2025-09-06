"use client"

import { usePrivy } from "@privy-io/react-auth"
import { FaGithub } from "react-icons/fa"
import Image from "next/image"

export default function Header() {
    // Check if Privy is available
    const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
    let login, logout, authenticated, user
    
    // Only use Privy hooks if app ID is available
    if (privyAppId) {
        const privy = usePrivy()
        login = privy.login
        logout = privy.logout
        authenticated = privy.authenticated
        user = privy.user
    } else {
        // Provide fallback values
        login = () => {}
        logout = () => {}
        authenticated = false
        user = null
    }

    const handleAuth = () => {
        if (authenticated) {
            logout()
        } else {
            login()
        }
    }

    return (
        <nav
            className="px-4 py-2 border-b-[1px] border-zinc-100 flex flex-row justify-between items-center min-h-[50px]"
            style={{ backgroundColor: "#f7eed8" }}
        >
            <div className="flex items-center gap-2">
                <a href="/" className="flex items-center gap-1 text-zinc-800">
                    {/* <Image
                        src="/nft-marketplace.png"
                        alt="nft marketplace"
                        width={24}
                        height={24}
                    /> */}
                    <h1 className="font-bold text-lg hidden md:block">Game NFT Marketplace</h1>
                </a>
              
            </div>
          
            <a href="/craft-nft" className="flex items-center gap-1 text-zinc-800">
                <span className="flex items-center justify-center gap-1 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded text-sm transition-colors duration-200 border border-zinc-300">
                    Craft NFT
                </span>
            </a>
            <div className="flex items-center gap-2">
                <button
                    onClick={handleAuth}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    {authenticated ? "Disconnect" : "Connect"}
                </button>
                {authenticated && user && user.wallet?.address && (
                    <div className="text-xs text-zinc-600">
                        {user.wallet.address.slice(0, 6)}...{user.wallet.address.slice(-4)}
                    </div>
                )}
            </div>
        </nav>
    )
}
