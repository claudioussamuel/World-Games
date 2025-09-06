import { useState, useEffect } from 'react';
import { createPublicClient, http, getContract } from 'viem';
import { baseSepolia } from 'viem/chains';

// ERC721 ABI for checking NFT ownership
const ERC721_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const NFT_CONTRACT_ADDRESS = '0xA5245D1E3b2A8b35c3D1da67E3c6FdB79164747B' as const;

export function useNftCheck(userAddress?: string) {
  const [hasNft, setHasNft] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkNftOwnership = async () => {
      if (!userAddress) {
        setHasNft(false);
        return;
      }

      setIsChecking(true);
      setError(null);

      try {
        // Create public client for Base Sepolia
        const publicClient = createPublicClient({
          chain: baseSepolia,
          transport: http('https://sepolia.base.org')
        });

        // Get contract instance
        const contract = getContract({
          address: NFT_CONTRACT_ADDRESS,
          abi: ERC721_ABI,
          client: publicClient
        });

        // Check balance (number of NFTs owned)
        const balance = await contract.read.balanceOf([userAddress as `0x${string}`]);
        
        // If balance > 0, user owns at least one NFT
        setHasNft(Number(balance) > 0);
      } catch (err) {
        console.error('Error checking NFT ownership:', err);
        setError('Failed to check NFT ownership');
        setHasNft(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkNftOwnership();
  }, [userAddress]);

  return { hasNft, isChecking, error };
}
