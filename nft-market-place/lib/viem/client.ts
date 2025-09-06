import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
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

// Create public client for reading from blockchain
export const createViemClient = (chainId: number = anvil.id) => {
    const rpcUrl = getRpcUrl(chainId);
    const chain = chainId === anvil.id ? anvil : chainId === sepolia.id ? sepolia : mainnet;
    
    return createPublicClient({
        chain,
        transport: http(rpcUrl),
    });
};

// For server-side operations (like cron jobs)
const PRIVATE_KEY = process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY
    ? process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY.startsWith("0x")
        ? (process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY as `0x${string}`)
        : (`0x${process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY}` as `0x${string}`)
    : null;

export const account = PRIVATE_KEY ? privateKeyToAccount(PRIVATE_KEY) : null;

// Default client for anvil
export const client = createViemClient(anvil.id);
