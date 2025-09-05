import { usePrivy } from "@privy-io/react-auth";
import { useCallback, useMemo } from "react";
import { 
    createWalletClient, 
    createPublicClient, 
    http, 
    getContract,
    type Address,
    type Hash,
    type PublicClient,
    type WalletClient
} from "viem";
import { anvil, sepolia, mainnet } from "viem/chains";

// Get the appropriate RPC URL based on the chain
const getRpcUrl = (chainId: number) => {
    switch (chainId) {
        case anvil.id:
            return "http://127.0.0.1:8545";
        case sepolia.id:
            return process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`;
        case mainnet.id:
            return process.env.NEXT_PUBLIC_MAINNET_RPC_URL || `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`;
        default:
            return "http://127.0.0.1:8545";
    }
};

export function useViemWithPrivy() {
    const { user, authenticated } = usePrivy();

    // Get the current chain from Privy
    const currentChain = useMemo(() => {
        if (!user?.wallet?.chainId) return anvil;
        
        switch (user.wallet.chainId) {
            case anvil.id:
                return anvil;
            case sepolia.id:
                return sepolia;
            case mainnet.id:
                return mainnet;
            default:
                return anvil;
        }
    }, [user?.wallet?.chainId]);

    // Create public client for reading
    const publicClient = useMemo(() => {
        const rpcUrl = getRpcUrl(currentChain.id);
        return createPublicClient({
            chain: currentChain,
            transport: http(rpcUrl),
        });
    }, [currentChain]);

    // Create wallet client for writing transactions
    const walletClient = useMemo(() => {
        if (!authenticated || !user?.wallet) return null;
        
        const rpcUrl = getRpcUrl(currentChain.id);
        return createWalletClient({
            chain: currentChain,
            transport: http(rpcUrl),
            account: user.wallet.address as Address,
        });
    }, [authenticated, user?.wallet, currentChain]);

    // Get contract instance
    const getContractInstance = useCallback((address: Address, abi: any) => {
        if (!walletClient) return null;
        
        return getContract({
            address,
            abi,
            client: walletClient,
        });
    }, [walletClient]);

    // Read contract function
    const readContract = useCallback(async (
        address: Address,
        abi: any,
        functionName: string,
        args?: any[]
    ) => {
        if (!publicClient) throw new Error("Public client not available");
        
        return await publicClient.readContract({
            address,
            abi,
            functionName,
            args,
        });
    }, [publicClient]);

    // Write contract function
    const writeContract = useCallback(async (
        address: Address,
        abi: any,
        functionName: string,
        args?: any[]
    ): Promise<Hash> => {
        if (!walletClient) throw new Error("Wallet client not available");
        
        return await walletClient.writeContract({
            address,
            abi,
            functionName,
            args,
        });
    }, [walletClient]);

    // Wait for transaction receipt
    const waitForTransactionReceipt = useCallback(async (hash: Hash) => {
        if (!publicClient) throw new Error("Public client not available");
        
        return await publicClient.waitForTransactionReceipt({ hash });
    }, [publicClient]);

    return {
        authenticated,
        user,
        currentChain,
        publicClient,
        walletClient,
        getContractInstance,
        readContract,
        writeContract,
        waitForTransactionReceipt,
        address: user?.wallet?.address as Address | undefined,
    };
}
