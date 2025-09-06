"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState } from "react"
import { PrivyProvider } from "@privy-io/react-auth"
import { anvil, mainnet, sepolia,baseSepolia,base,liskSepolia,lisk } from "viem/chains"

export function Providers(props: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <PrivyProvider 
            config={{
                loginMethods: [
                    "wallet",
                    "email",
                    "github",
                    "twitter",
                    "discord",
                    "google",
                    "linkedin"
                ],
                embeddedWallets: {
                    createOnLogin: 'users-without-wallets',
                },
                defaultChain: baseSepolia,
                supportedChains: [anvil, sepolia, mainnet,baseSepolia,base,liskSepolia,lisk],
            }}
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
        >
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </PrivyProvider>
    )
}
