// app/buy-nft/[contractAddress]/[tokenId]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { CONTRACT_ADDRESSES, erc20Abi, marketplaceAbi } from "@/constants"
import NFTBox from "@/components/NFTBox"
import { useViemWithPrivy } from "@/hooks/useViemWithPrivy"

export default function BuyNftPage() {
    const router = useRouter()
    const { contractAddress, tokenId } = useParams() as {
        contractAddress: string
        tokenId: string
    }
    const { authenticated, user } = usePrivy()
    const { 
        address, 
        currentChain, 
        readContract, 
        writeContract, 
        waitForTransactionReceipt 
    } = useViemWithPrivy()

    const marketplaceAddress = CONTRACT_ADDRESSES.nftMarketplace as `0x${string}`
    const usdcAddress = CONTRACT_ADDRESSES.usdc as `0x${string}`

    const [step, setStep] = useState(1) // 1: Preview, 2: Approval, 3: Purchase
    
    // State for contract interactions
    const [listingData, setListingData] = useState<any>(null)
    const [isListingLoading, setIsListingLoading] = useState(true)
    const [approvalHash, setApprovalHash] = useState<string | null>(null)
    const [purchaseHash, setPurchaseHash] = useState<string | null>(null)
    const [isApprovalPending, setIsApprovalPending] = useState(false)
    const [isPurchasePending, setIsPurchasePending] = useState(false)
    const [isApprovalSuccess, setIsApprovalSuccess] = useState(false)
    const [isPurchaseSuccess, setIsPurchaseSuccess] = useState(false)
    const [approvalError, setApprovalError] = useState<Error | null>(null)
    const [purchaseError, setPurchaseError] = useState<Error | null>(null)

    interface Listing {
        price: bigint
        seller: string
    }

    // Get the listing details
    useEffect(() => {
        const fetchListing = async () => {
            if (authenticated && contractAddress && tokenId) {
                try {
                    setIsListingLoading(true)
                    const listing = await readContract(
                        marketplaceAddress,
                        marketplaceAbi,
                        "getListing",
                        [contractAddress as `0x${string}`, BigInt(tokenId)]
                    )
                    setListingData(listing)
                } catch (error) {
                    console.error("Error fetching listing:", error)
                    setListingData(null)
                } finally {
                    setIsListingLoading(false)
                }
            }
        }
        fetchListing()
    }, [authenticated, contractAddress, tokenId, marketplaceAddress, readContract])

    // Destructure listing data if available
    const listing = listingData as Listing | undefined
    const price = listing ? listing.price.toString() : "0"
    const seller = listing ? listing.seller : undefined

    // Check if NFT is actually listed (price > 0)
    const isListed = price && BigInt(price) > BigInt(0)

    // Handle approve token
    const handleApprove = async () => {
        if (!price) return

        setIsApprovalPending(true)
        setApprovalError(null)

        try {
            const hash = await writeContract(
                usdcAddress,
                erc20Abi,
                "approve",
                [marketplaceAddress, BigInt(price)]
            )
            setApprovalHash(hash)
            
            // Wait for transaction receipt
            const receipt = await waitForTransactionReceipt(hash)
            if (receipt.status === "success") {
                setIsApprovalSuccess(true)
                setStep(2)
            }
        } catch (error) {
            console.error("Error approving token:", error)
            setApprovalError(error as Error)
        } finally {
            setIsApprovalPending(false)
        }
    }

    // Handle buy NFT
    const handleBuy = async () => {
        setIsPurchasePending(true)
        setPurchaseError(null)

        try {
            const hash = await writeContract(
                marketplaceAddress,
                marketplaceAbi,
                "buyItem",
                [contractAddress as `0x${string}`, BigInt(tokenId)]
            )
            setPurchaseHash(hash)
            
            // Wait for transaction receipt
            const receipt = await waitForTransactionReceipt(hash)
            if (receipt.status === "success") {
                setIsPurchaseSuccess(true)
                setStep(3)
            }
        } catch (error) {
            console.error("Error buying NFT:", error)
            setPurchaseError(error as Error)
        } finally {
            setIsPurchasePending(false)
        }
    }

    // Redirect to home if purchase is successful
    useEffect(() => {
        if (step === 3 && isPurchaseSuccess) {
            const timer = setTimeout(() => {
                router.push("/")
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [step, isPurchaseSuccess, router])

    // Check if the current user is the seller
    const isSeller = seller === address

    const chainSupported = currentChain.id === 84532 // Base Sepolia chain ID

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-gray-700">Buy NFT</h1>

                    {!authenticated ? (
                        <div className="p-8 bg-white rounded-xl shadow-sm border border-zinc-200 text-center">
                            <p className="text-lg text-zinc-600 mb-4">
                                Connect your wallet to purchase this NFT
                            </p>
                            <p className="text-sm text-zinc-500">
                                Please use the Connect Wallet button in the header
                            </p>
                        </div>
                    ) : !chainSupported ? (
                        <div className="p-8 bg-white rounded-xl shadow-sm border border-zinc-200 text-center">
                            <p className="text-lg text-red-600 mb-4">
                                The current network is not supported. Please switch to a supported
                                network.
                            </p>
                            <p className="text-sm text-zinc-500">
                                Please switch to Base Sepolia network
                            </p>
                        </div>
                    ) : isListingLoading ? (
                        <div className="p-8 bg-white rounded-xl shadow-sm border border-zinc-200 text-center">
                            <p className="text-lg text-zinc-600">Loading NFT details...</p>
                        </div>
                    ) : !isListed ? (
                        <div className="p-8 bg-white rounded-xl shadow-sm border border-zinc-200 text-center">
                            <p className="text-lg text-red-600 mb-4">
                                This NFT is not currently listed for sale.
                            </p>
                            <button
                                onClick={() => router.push("/")}
                                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                            >
                                Back to Home
                            </button>
                        </div>
                    ) : isSeller ? (
                        <div className="p-8 bg-white rounded-xl shadow-sm border border-zinc-200 text-center">
                            <p className="text-lg text-orange-600 mb-4">
                                You are the seller of this NFT.
                            </p>
                            <button
                                onClick={() => router.push("/")}
                                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                            >
                                Back to Home
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold">NFT Details</h2>

                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/3">
                                            <NFTBox
                                                tokenId={tokenId}
                                                contractAddress={contractAddress}
                                                price={price}
                                            />
                                        </div>

                                        <div className="md:w-2/3 space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">
                                                    Contract Address
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-900 break-all">
                                                    {contractAddress}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">
                                                    Token ID
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-900">
                                                    {tokenId}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">
                                                    Seller
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-900 break-all">
                                                    {seller}
                                                </p>
                                            </div>

                                            <div className="pt-4">
                                                <button
                                                    onClick={handleApprove}
                                                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                    disabled={isApprovalPending}
                                                >
                                                    {isApprovalPending
                                                        ? "Approving..."
                                                        : "Approve Payment Token"}
                                                </button>

                                                {approvalError && (
                                                    <div className="p-4 bg-red-50 text-red-700 rounded-md mt-4">
                                                        {approvalError.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold">Complete Purchase</h2>

                                    {isApprovalSuccess ? (
                                        <>
                                            <div className="p-4 bg-green-50 text-green-700 rounded-md">
                                                Payment token approved! You can now complete the
                                                purchase.
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-8">
                                                <div className="md:w-1/3">
                                                    <NFTBox
                                                        tokenId={tokenId}
                                                        contractAddress={contractAddress}
                                                        price={price}
                                                    />
                                                </div>

                                                <div className="md:w-2/3 space-y-4">
                                                    <button
                                                        onClick={handleBuy}
                                                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                        disabled={isPurchasePending}
                                                    >
                                                        {isPurchasePending
                                                            ? "Processing..."
                                                            : "Buy Now"}
                                                    </button>

                                                    {purchaseError && (
                                                        <div className="p-4 bg-red-50 text-red-700 rounded-md mt-4">
                                                            {purchaseError.message}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
                                            Waiting for approval transaction to be confirmed...
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold">Purchase Complete</h2>

                                    {isPurchaseSuccess ? (
                                        <>
                                            <div className="p-4 bg-green-50 text-green-700 rounded-md">
                                                Congratulations! You have successfully purchased
                                                this NFT. You will be redirected to the homepage in
                                                a few seconds.
                                            </div>

                                            <div className="mx-auto w-64">
                                                <NFTBox
                                                    tokenId={tokenId}
                                                    contractAddress={contractAddress}
                                                    price={price}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
                                            Waiting for purchase transaction to be confirmed...
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <footer className="bg-white border-t border-zinc-200 py-4">
                <div className="container mx-auto px-4">
                    <p className="text-center text-zinc-500 text-sm">
                        NFT Marketplace • Built with Next.js, Privy, and Viem
                    </p>
                </div>
            </footer>
        </div>
    )
}
