"use client"

import { usePrivy } from "@privy-io/react-auth"
import { FaGithub } from "react-icons/fa"
import Image from "next/image"

export default function Header() {
    const { login, logout, authenticated, user } = usePrivy()

    const handleAuth = () => {
        if (authenticated) {
            logout()
        } else {
            login()
        }
    }

    return (
        <nav
            className="px-8 py-4.5 border-b-[1px] border-zinc-100 flex flex-row justify-between items-center xl:min-h-[77px]"
            style={{ backgroundColor: "#f7eed8" }}
        >
            <div className="flex items-center gap-2.5 md:gap-6">
                <a href="/" className="flex items-center gap-1 text-zinc-800">
                    {/* <Image
                        src="/nft-marketplace.png"
                        alt="nft marketplace"
                        width={36}
                        height={36}
                    /> */}
                    <h1 className="font-bold text-2xl hidden md:block">Game NFT Marketplace</h1>
                </a>
              
            </div>
          
            {/* <a href="/cake-nft" className="flex items-center gap-1 text-zinc-800">
                <h1 className="flex items-center justify-center gap-1 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-md shadow-sm transition-colors duration-200 border border-zinc-300">
                    Cake NFT
                </h1>
            </a> */}
            <div className="flex items-center gap-4">
                <button
                    onClick={handleAuth}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    {authenticated ? "Disconnect" : "Connect Wallet"}
                </button>
                {authenticated && user && (
                    <div className="text-sm text-zinc-600">
                        {user.wallet?.address ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : "Connected"}
                    </div>
                )}
            </div>
        </nav>
    )
}
