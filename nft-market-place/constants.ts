// Base Sepolia Contract Addresses
export const CONTRACT_ADDRESSES = {
    nftMarketplace: "0x57e0839e2232468eEb5e58BC3fA25157540E487D",
    craftNft: "0x44Da9c385923e1A5d4eae81C99a4183DD2a86158",
    usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
} as const

export const erc20Abi = [
    {
        type: "function",
        name: "allowance",
        inputs: [
            {
                name: "owner",
                type: "address",
                internalType: "address",
            },
            {
                name: "spender",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "approve",
        inputs: [
            {
                name: "spender",
                type: "address",
                internalType: "address",
            },
            {
                name: "value",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "balanceOf",
        inputs: [
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "decimals",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint8",
                internalType: "uint8",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "string",
                internalType: "string",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "symbol",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "string",
                internalType: "string",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "totalSupply",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "transfer",
        inputs: [
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "value",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "transferFrom",
        inputs: [
            {
                name: "from",
                type: "address",
                internalType: "address",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "value",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "event",
        name: "Approval",
        inputs: [
            {
                name: "owner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "spender",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "value",
                type: "uint256",
                indexed: false,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Transfer",
        inputs: [
            {
                name: "from",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "to",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "value",
                type: "uint256",
                indexed: false,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
    {
        type: "error",
        name: "ERC20InsufficientAllowance",
        inputs: [
            {
                name: "spender",
                type: "address",
                internalType: "address",
            },
            {
                name: "allowance",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "needed",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
    {
        type: "error",
        name: "ERC20InsufficientBalance",
        inputs: [
            {
                name: "sender",
                type: "address",
                internalType: "address",
            },
            {
                name: "balance",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "needed",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
    {
        type: "error",
        name: "ERC20InvalidApprover",
        inputs: [
            {
                name: "approver",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC20InvalidReceiver",
        inputs: [
            {
                name: "receiver",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC20InvalidSender",
        inputs: [
            {
                name: "sender",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC20InvalidSpender",
        inputs: [
            {
                name: "spender",
                type: "address",
                internalType: "address",
            },
        ],
    },
]

export const marketplaceAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"AlreadyListed","type":"error"},{"inputs":[{"internalType":"uint256","name":"required","type":"uint256"},{"internalType":"uint256","name":"sent","type":"uint256"}],"name":"InsufficientPayment","type":"error"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ItemNotForSale","type":"error"},{"inputs":[],"name":"NoProceeds","type":"error"},{"inputs":[],"name":"NotApprovedForMarketplace","type":"error"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"NotListed","type":"error"},{"inputs":[],"name":"NotOwner","type":"error"},{"inputs":[],"name":"PriceMustBeAboveZero","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"inputs":[],"name":"TransferFailed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"address","name":"nftAddress","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"ItemBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"seller","type":"address"},{"indexed":true,"internalType":"address","name":"nftAddress","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ItemCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"seller","type":"address"},{"indexed":true,"internalType":"address","name":"nftAddress","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"ItemListed","type":"event"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"buyItem","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"cancelListing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getListing","outputs":[{"components":[{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"address","name":"seller","type":"address"}],"internalType":"struct NftMarketplace.Listing","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"seller","type":"address"}],"name":"getProceeds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"name":"listItem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updateListing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawProceeds","outputs":[],"stateMutability":"nonpayable","type":"function"}]

export const craftAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"inputs":[],"name":"InvalidTokenURI","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"TokenDoesNotExist","type":"error"},{"inputs":[],"name":"UnauthorizedCaller","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"tokenURI","type":"string"}],"name":"NFTMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newTokenURI","type":"string"}],"name":"TokenURIUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"string[]","name":"tokenURIs","type":"string[]"}],"name":"batchMint","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"exists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentTokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintWithURI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"newTokenURI","type":"string"}],"name":"updateTokenURI","outputs":[],"stateMutability":"nonpayable","type":"function"}]

export const nftAbi = [
    {
        type: "function",
        name: "approve",
        inputs: [
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "balanceOf",
        inputs: [
            {
                name: "owner",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getApproved",
        inputs: [
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "address",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "isApprovedForAll",
        inputs: [
            {
                name: "owner",
                type: "address",
                internalType: "address",
            },
            {
                name: "operator",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "string",
                internalType: "string",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "ownerOf",
        inputs: [
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "address",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "safeTransferFrom",
        inputs: [
            {
                name: "from",
                type: "address",
                internalType: "address",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "safeTransferFrom",
        inputs: [
            {
                name: "from",
                type: "address",
                internalType: "address",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "data",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "setApprovalForAll",
        inputs: [
            {
                name: "operator",
                type: "address",
                internalType: "address",
            },
            {
                name: "approved",
                type: "bool",
                internalType: "bool",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "supportsInterface",
        inputs: [
            {
                name: "interfaceId",
                type: "bytes4",
                internalType: "bytes4",
            },
        ],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "symbol",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "string",
                internalType: "string",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "tokenURI",
        inputs: [
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "string",
                internalType: "string",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "transferFrom",
        inputs: [
            {
                name: "from",
                type: "address",
                internalType: "address",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "event",
        name: "Approval",
        inputs: [
            {
                name: "owner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "approved",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                indexed: true,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "ApprovalForAll",
        inputs: [
            {
                name: "owner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "operator",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "approved",
                type: "bool",
                indexed: false,
                internalType: "bool",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Transfer",
        inputs: [
            {
                name: "from",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "to",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                indexed: true,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
    {
        type: "error",
        name: "ERC721IncorrectOwner",
        inputs: [
            {
                name: "sender",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "owner",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721InsufficientApproval",
        inputs: [
            {
                name: "operator",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721InvalidApprover",
        inputs: [
            {
                name: "approver",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721InvalidOperator",
        inputs: [
            {
                name: "operator",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721InvalidOwner",
        inputs: [
            {
                name: "owner",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721InvalidReceiver",
        inputs: [
            {
                name: "receiver",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721InvalidSender",
        inputs: [
            {
                name: "sender",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721NonexistentToken",
        inputs: [
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
]
