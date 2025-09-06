import { useState, useEffect } from "react"
import NFTBox from "./NFTBox"
import Link from "next/link"
import { useViemWithPrivy } from "@/hooks/useViemWithPrivy"
import { CONTRACT_ADDRESSES, marketplaceAbi, craftAbi } from "@/constants"

// Mock data for demonstration - in a real app, you'd fetch this from events or a subgraph
const MOCK_LISTINGS = [
    {
        contractAddress: CONTRACT_ADDRESSES.craftNft,
        tokenId: "1",
        price: "1000000", // 1 USDC in smallest units
        seller: "0x1234567890123456789012345678901234567890"
    },
    {
        contractAddress: CONTRACT_ADDRESSES.craftNft, 
        tokenId: "2",
        price: "2500000", // 2.5 USDC in smallest units
        seller: "0x0987654321098765432109876543210987654321"
    },
    {
        contractAddress: CONTRACT_ADDRESSES.craftNft,
        tokenId: "3", 
        price: "500000", // 0.5 USDC in smallest units
        seller: "0x1111111111111111111111111111111111111111"
    }
]

// Main component that uses the custom hook
export default function RecentlyListedNFTs() {
    const { authenticated, readContract } = useViemWithPrivy()
    const [listings, setListings] = useState(MOCK_LISTINGS)
    const [isLoading, setIsLoading] = useState(false)

    const marketplaceAddress = CONTRACT_ADDRESSES.nftMarketplace as `0x${string}`

    // In a real implementation, you would:
    // 1. Listen to ItemListed events from the marketplace contract
    // 2. Use a subgraph to query all listings
    // 3. Or maintain a database of listings
    // For now, we'll use mock data and show how to verify listings

    const verifyListing = async (contractAddress: string, tokenId: string) => {
        if (!authenticated) return null
        
        try {
            const listing = await readContract(
                marketplaceAddress,
                marketplaceAbi,
                "getListing",
                [contractAddress as `0x${string}`, BigInt(tokenId)]
            )
            return listing
        } catch (error) {
            console.error("Error verifying listing:", error)
            return null
        }
    }

    // Verify all mock listings when component mounts
    useEffect(() => {
        const verifyAllListings = async () => {
            if (!authenticated) return
            
            setIsLoading(true)
            const verifiedListings = []
            
            for (const listing of MOCK_LISTINGS) {
                const verified = await verifyListing(listing.contractAddress, listing.tokenId)
                if (verified && (verified as any).price > 0) {
                    verifiedListings.push({
                        ...listing,
                        price: (verified as any).price.toString(),
                        seller: (verified as any).seller
                    })
                }
            }
            
            setListings(verifiedListings)
            setIsLoading(false)
        }

        verifyAllListings()
    }, [authenticated, readContract])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mt-8 text-center">
                <Link
                    href="/list-nft"
                    className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    List Your NFT
                </Link>
            </div>
            <h2 className="text-2xl font-bold mb-6">Recently Listed NFTs</h2>

            {isLoading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading listings...</p>
                </div>
            ) : listings.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No NFTs are currently listed for sale.</p>
                    <p className="text-sm text-gray-500 mt-2">Be the first to list an NFT!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {listings.map((listing, index) => (
                        <Link
                            key={`${listing.contractAddress}-${listing.tokenId}-${index}`}
                            href={`/buy-nft/${listing.contractAddress}/${listing.tokenId}`}
                            className="block hover:scale-105 transition-transform duration-200"
                        >
                            <NFTBox
                                tokenId={listing.tokenId}
                                contractAddress={listing.contractAddress}
                                price={listing.price}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}