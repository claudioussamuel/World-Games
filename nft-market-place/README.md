# NFT Marketplace

A decentralized NFT marketplace built with Next.js, Privy, and Viem. This marketplace allows users to mint, list, and trade NFTs across multiple blockchain networks.

## Features

- 🔗 **Multi-wallet Support**: Connect with various wallets via Privy
- 🎨 **NFT Minting**: Create new Cake NFTs with custom metadata
- 🛒 **Marketplace**: List and buy NFTs with USDC payments
- 🌐 **Multi-chain**: Support for Anvil, Sepolia, Mainnet, Base Sepolia, Base, Lisk Sepolia, and Lisk
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Viem, Privy
- **State Management**: TanStack Query
- **Icons**: React Icons

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nft-market-place
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with your configuration:
   ```bash
   NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
   ```

   See [SETUP.md](./SETUP.md) for detailed configuration options.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── buy-nft/           # NFT purchase pages
│   ├── cake-nft/          # NFT minting page
│   ├── list-nft/          # NFT listing page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── CakeNft.tsx       # NFT minting component
│   ├── Header.tsx        # Navigation header
│   ├── ListNftForm.tsx   # NFT listing form
│   ├── NFTBox.tsx        # NFT display component
│   └── RecentlyListed.tsx # Marketplace listings
├── hooks/                # Custom React hooks
│   └── useViemWithPrivy.ts # Blockchain interaction hook
├── lib/                  # Utility libraries
├── utils/                # Helper functions
├── constants.ts          # Contract addresses and ABIs
└── public/              # Static assets
```

## Smart Contracts

The marketplace interacts with two main smart contracts:

### NFT Contract (CakeNft)
- `mint(tokenURI)`: Mint a new NFT
- `tokenURI(tokenId)`: Get metadata URI
- `ownerOf(tokenId)`: Get token owner

### Marketplace Contract
- `listItem(nftAddress, tokenId, price)`: List NFT for sale
- `buyItem(nftAddress, tokenId)`: Purchase NFT
- `getListing(nftAddress, tokenId)`: Get listing details
- `cancelListing(nftAddress, tokenId)`: Cancel listing

## Supported Networks

- **Anvil (Local)**: For development and testing
- **Sepolia**: Ethereum testnet
- **Mainnet**: Ethereum mainnet
- **Base Sepolia**: Base testnet
- **Base**: Base mainnet
- **Lisk Sepolia**: Lisk testnet
- **Lisk**: Lisk mainnet

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions and support, please refer to the [SETUP.md](./SETUP.md) file or create an issue in the repository.
