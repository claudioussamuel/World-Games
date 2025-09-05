import React, { useState, useEffect } from "react"
import Image from "next/image"
import { cakeAbi } from "../constants"
import formatPrice from "../utils/formatPrice"
import { useViemWithPrivy } from "@/hooks/useViemWithPrivy"

// Type for the NFT data
interface NFTBoxProps {
    tokenId: string
    contractAddress: string
    price: string
}

export default function NFTBox({ tokenId, contractAddress, price }: NFTBoxProps) {
    const [nftImageUrl, setNftImageUrl] = useState<string | null>(null)
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [tokenURIData, setTokenURIData] = useState<string | null>(null)
    const [isTokenURILoading, setIsTokenURILoading] = useState(false)
    const [tokenURIError, setTokenURIError] = useState<Error | null>(null)

    const { readContract, authenticated } = useViemWithPrivy()

    // Fetch the tokenURI from the contract
    useEffect(() => {
        const fetchTokenURI = async () => {
            if (tokenId && contractAddress && authenticated) {
                try {
                    setIsTokenURILoading(true)
                    setTokenURIError(null)
                    const tokenURI = await readContract(
                        contractAddress as `0x${string}`,
                        cakeAbi,
                        "tokenURI",
                        [BigInt(tokenId)]
                    )
                    setTokenURIData(tokenURI as string)
                } catch (error) {
                    console.error("Error fetching tokenURI:", error)
                    setTokenURIError(error as Error)
                } finally {
                    setIsTokenURILoading(false)
                }
            }
        }
        fetchTokenURI()
    }, [tokenId, contractAddress, authenticated, readContract])

    // Fetch the metadata and extract image URL when tokenURI is available
    useEffect(() => {
        if (tokenURIData && !isTokenURILoading) {
            const fetchMetadata = async () => {
                setIsLoadingImage(true)
                try {
                    // Handle both HTTP and IPFS URIs
                    const uri = tokenURIData as string
                    let url = uri

                    const response = await fetch(url)
                    const metadata = await response.json()

                    let imageUrl = metadata.image

                    setNftImageUrl(imageUrl)
                } catch (error) {
                    console.error("Error fetching metadata:", error)
                    setImageError(true)
                } finally {
                    setIsLoadingImage(false)
                }
            }

            fetchMetadata()
        }
    }, [tokenURIData, isTokenURILoading, tokenId, contractAddress])

    return (
        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="aspect-square relative bg-gray-100">
                {isLoadingImage || isTokenURILoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="animate-pulse">Loading...</span>
                    </div>
                ) : imageError || tokenURIError || !nftImageUrl ? (
                    // Fallback to local placeholder when there's an error
                    <Image
                        src="/placeholder.png"
                        alt={`NFT ${tokenId}`}
                        fill
                        className="object-cover"
                    />
                ) : (
                    // Display the actual NFT image
                    <Image
                        src={nftImageUrl}
                        alt={`NFT ${tokenId}`}
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                    />
                )}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">Token #{tokenId}</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {formatPrice(price)}
                    </span>
                </div>
                <p className="text-sm text-gray-600" title={contractAddress}>
                    Contract: {contractAddress}
                </p>
            </div>
        </div>
    )
}
