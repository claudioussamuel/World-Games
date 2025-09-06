"use client"

import { useState, useMemo, useEffect } from "react"
import { RiToolsLine } from "react-icons/ri"
import { usePrivy } from "@privy-io/react-auth"
import { craftAbi, CONTRACT_ADDRESSES } from "@/constants"
import { CgSpinner } from "react-icons/cg"
import { InputForm } from "./ui/InputField"
import { useViemWithPrivy } from "@/hooks/useViemWithPrivy"

interface NFTContractFormProps {
    // If you want to pass a contract address directly (optional)
    contractAddress?: `0x${string}`
}

export default function NFTContractForm({ contractAddress }: NFTContractFormProps) {
    const { user } = usePrivy()
    const { 
        currentChain, 
        readContract, 
        writeContract, 
        waitForTransactionReceipt,
        getContractInstance
    } = useViemWithPrivy()

    const craftContractAddress = useMemo(() => {
        if (contractAddress) return contractAddress
        return CONTRACT_ADDRESSES.craftNft as `0x${string}`
    }, [contractAddress])

    const [tokenId, setTokenId] = useState("")
    const [myTokenIds, setMyTokenIds] = useState<string[]>([])
    const [nftImageUrl, setNftImageUrl] = useState<string | null>(null)
    const [lastMintedTokenId, setLastMintedTokenId] = useState<string | null>(null)
    
    // State for contract interactions
    const [craftNftHash, setCraftNftHash] = useState<string | null>(null)
    const [isCraftPending, setIsCraftPending] = useState(false)
    const [craftNftError, setCraftNftError] = useState<Error | null>(null)
    const [isCraftConfirming, setIsCraftConfirming] = useState(false)
    const [isCraftConfirmed, setIsCraftConfirmed] = useState(false)
    const [isCraftError, setIsCraftError] = useState(false)
    const [dataFromCraftReceipt, setDataFromCraftReceipt] = useState<any>(null)
    
    // State for tokenURI
    const [tokenURIData, setTokenURIData] = useState<string | null>(null)
    const [isTokenURILoading, setIsTokenURILoading] = useState(false)
    const [tokenURIError, setTokenURIError] = useState<Error | null>(null)

    // Function to mint a craft NFT (JustPay pattern)
    async function handleCraftNft() {
        if (!craftContractAddress) return
        
        // Check authentication first
        if (!user || !user.wallet?.address) {
            setCraftNftError(new Error("Please connect your wallet first"))
            return
        }
        
        setIsCraftPending(true)
        setCraftNftError(null)

        try {
            // Get contract instance using JustPay pattern
            const contract = await getContractInstance(
                craftContractAddress,
                craftAbi
            )
            
            if (!contract) {
                throw new Error("Failed to get contract instance")
            }

            // Direct contract write call (JustPay pattern)
            const hash = await contract.write.mint([
                "https://amber-shrill-camel-588.mypinata.cloud/ipfs/bafkreibdibuhyumnmsmhh3ivlr2omtxlb2euuomvmzkom256b7a5dycx7m" // You can customize this URI
            ])
            
            setCraftNftHash(hash)
            console.log("Craft NFT transaction submitted:", hash)
            
            // Wait for transaction receipt
            setIsCraftConfirming(true)
            const receipt = await waitForTransactionReceipt(hash)
            setDataFromCraftReceipt(receipt)
            
            if (receipt.status === "success") {
                setIsCraftConfirmed(true)
                setIsCraftError(false)
            } else {
                setIsCraftError(true)
            }
        } catch (error) {
            console.error("Error crafting NFT:", error)
            setCraftNftError(error as Error)
            setIsCraftError(true)
        } finally {
            setIsCraftPending(false)
            setIsCraftConfirming(false)
        }
    }

    // Function to fetch all NFTs owned by this wallet
    async function fetchMyNFTs() {
        // Logic to fetch NFTs owned by the wallet
        // This is left blank as requested
        console.log("Fetching NFTs for address:", user?.wallet?.address)

        // Mock implementation - would be replaced with actual logic
        setMyTokenIds(["Sample implementation - Replace with actual NFT fetching logic"])
    }

    // Fetch tokenURI when tokenId changes
    useEffect(() => {
        const fetchTokenURI = async () => {
            if (tokenId && craftContractAddress) {
                try {
                    setIsTokenURILoading(true)
                    setTokenURIError(null)
                    const tokenURI = await readContract(
                        craftContractAddress,
                        craftAbi,
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
    }, [tokenId, craftContractAddress, readContract])

    // Effect to process tokenURI data when it changes
    useEffect(() => {
        if (tokenURIData && !isTokenURILoading) {
            const fetchMetadata = async () => {
                try {
                    // Handle both HTTP and IPFS URIs
                    const uri = tokenURIData as string
                    let url = uri

                    const response = await fetch(url)
                    const metadata = await response.json()

                    // Get image URL from metadata
                    let imageUrl = metadata.image

                    setNftImageUrl(imageUrl)
                } catch (error) {
                    console.error("Error fetching metadata:", error)
                }
            }

            fetchMetadata()
        }
    }, [tokenURIData, isTokenURILoading])

    // Effect to persist input values in localStorage
    useEffect(() => {
        const savedTokenId = localStorage.getItem("nftTokenId")
        if (savedTokenId) setTokenId(savedTokenId)
    }, [])

    useEffect(() => {
        localStorage.setItem("nftTokenId", tokenId)
    }, [tokenId])

    // Effect to track the minted NFT from transaction receipt
    useEffect(() => {
        console.dir(dataFromCraftReceipt)
        if (isCraftConfirmed && craftNftHash) {
            const hexTokenIdFromReceipt = dataFromCraftReceipt.logs[1].topics[1]
            const intTokenIdFromReceipt = parseInt(hexTokenIdFromReceipt!, 16) 
            setLastMintedTokenId(`TokenID: ${intTokenIdFromReceipt}`)
        }
    }, [isCraftConfirmed, craftNftHash])

    // Helper function for button content
    function getCraftNftButtonContent() {
        if (isCraftPending)
            return (
                <div className="flex items-center justify-center gap-2 w-full">
                    <CgSpinner className="animate-spin" size={20} />
                    <span>Confirming in wallet...</span>
                </div>
            )
        if (isCraftConfirming)
            return (
                <div className="flex items-center justify-center gap-2 w-full">
                    <CgSpinner className="animate-spin" size={20} />
                    <span>Crafting your NFT...</span>
                </div>
            )
        if (craftNftError || isCraftError) {
            console.log(craftNftError)
            return (
                <div className="flex items-center justify-center gap-2 w-full">
                    <span>
                        {craftNftError?.message?.includes("connect your wallet") 
                            ? "Please connect your wallet first" 
                            : "Error crafting NFT, see console."
                        }
                    </span>
                </div>
            )
        }
        if (isCraftConfirmed) {
            return "NFT crafted successfully!"
        }
        return (
            <div className="flex items-center justify-center gap-2">
                <RiToolsLine size={20} />
                <span>Craft an NFT</span>
            </div>
        )
    }

    return (
        <div className="max-w-2xl min-w-full xl:min-w-lg w-full lg:mx-auto p-6 flex flex-col gap-6 bg-white rounded-xl ring-[4px] border-2 border-blue-500 ring-blue-500/25">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-zinc-900">Craft NFT Workshop</h2>
            </div>

            <div className="space-y-6">
                <div className="bg-white border border-zinc-300 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-zinc-900 mb-3">Craft a New NFT</h3>

                    <button
                        className="cursor-pointer flex items-center justify-center w-full py-3 rounded-[9px] text-white transition-colors font-semibold relative border bg-blue-500 hover:bg-blue-600 border-blue-500"
                        onClick={handleCraftNft}
                        disabled={isCraftPending || isCraftConfirming}
                    >
                        {/* Gradient */}
                        <div className="absolute w-full inset-0 bg-gradient-to-b from-white/25 via-80% to-transparent mix-blend-overlay z-10 rounded-lg" />
                        {/* Inner shadow */}
                        <div className="absolute w-full inset-0 mix-blend-overlay z-10 inner-shadow rounded-lg" />
                        {/* White inner border */}
                        <div className="absolute w-full inset-0 mix-blend-overlay z-10 border-[1.5px] border-white/20 rounded-lg" />
                        {getCraftNftButtonContent()}
                    </button>

                    {lastMintedTokenId && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-700">
                                <span className="font-medium">Successfully crafted!</span>
                                <br />
                                {lastMintedTokenId}
                            </p>
                        </div>
                    )}
                </div>

                {/* Section 3: Show NFT by tokenId */}
                <div className="bg-white border border-zinc-300 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-zinc-900 mb-3">View an NFT</h3>

                    <div className="flex gap-3">
                        <div className="flex-grow">
                            <InputForm
                                label="Token ID"
                                placeholder="Enter token ID"
                                value={tokenId}
                                onChange={e => setTokenId(e.target.value)}
                            />
                        </div>
                    </div>

                    {nftImageUrl && (
                        <div className="mt-4">
                            <div className="overflow-hidden rounded-lg border border-zinc-200">
                                <img
                                    src={nftImageUrl}
                                    alt={`NFT #${tokenId}`}
                                    className="w-full h-auto max-h-96 object-contain bg-zinc-50"
                                    onError={() => {
                                        console.error("Error loading NFT image")
                                    }}
                                />
                            </div>
                            <p className="text-sm text-zinc-500 mt-2 text-center">
                                NFT #{tokenId}
                            </p>
                        </div>
                    )}

                    {tokenURIError && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">
                                <span className="font-medium">Error:</span> Could not find NFT with
                                this token ID
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
