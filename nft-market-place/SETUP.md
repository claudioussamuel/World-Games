# NFT Marketplace Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Privy Configuration (Required)
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here

# Base Sepolia RPC URL (Optional - defaults to public RPC if not provided)
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables (see above)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- **Connect Wallet**: Support for multiple wallet providers via Privy
- **Mint NFTs**: Create new Cake NFTs using the mint function
- **List NFTs**: List your NFTs for sale on the marketplace
- **Buy NFTs**: Purchase NFTs listed by other users
- **Base Sepolia Support**: Optimized for Base Sepolia testnet

## Contract Addresses

The marketplace uses Base Sepolia contract addresses configured in `constants.ts`:

- **NFT Marketplace**: `0x57e0839e2232468eEb5e58BC3fA25157540E487D`
- **Craft NFT**: `0x44Da9c385923e1A5d4eae81C99a4183DD2a86158`
- **USDC**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

## Smart Contract Functions

### NFT Contract (CraftNft)
- `mint(tokenURI)`: Mint a new NFT with the given metadata URI
- `tokenURI(tokenId)`: Get the metadata URI for a specific token
- `ownerOf(tokenId)`: Get the owner of a specific token

### Marketplace Contract
- `listItem(nftAddress, tokenId, price)`: List an NFT for sale
- `buyItem(nftAddress, tokenId)`: Buy a listed NFT
- `getListing(nftAddress, tokenId)`: Get listing details
- `cancelListing(nftAddress, tokenId)`: Cancel a listing

## Troubleshooting

1. **Wallet Connection Issues**: Make sure you have the correct Privy App ID
2. **Transaction Failures**: Check that you have sufficient gas and the correct network
3. **Contract Errors**: Verify that the contract addresses in `constants.ts` are correct for your network
4. **RPC Issues**: Ensure your RPC URLs are working and have sufficient rate limits
