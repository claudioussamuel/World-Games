// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

contract CraftNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Events
    event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event TokenURIUpdated(uint256 indexed tokenId, string newTokenURI);
    
    // Errors
    error TokenDoesNotExist();
    error InvalidTokenURI();
    error UnauthorizedCaller();
    
    constructor() ERC721("Craft NFT", "CRAFT") Ownable(msg.sender) {}
    
    /**
     * @dev Mints a new NFT with a custom token URI
     * @param to The address to mint the NFT to
     * @param tokenURI The custom token URI for the NFT
     * @return The token ID of the minted NFT
     */
    function mintWithURI(address to, string memory tokenURI) public  returns (uint256) {
        if (bytes(tokenURI).length == 0) {
            revert InvalidTokenURI();
        }
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit NFTMinted(to, tokenId, tokenURI);
        return tokenId;
    }
    
    /**
     * @dev Mints a new NFT with a custom token URI (public minting)
     * @param tokenURI The custom token URI for the NFT
     * @return The token ID of the minted NFT
     */
    function mint(string memory tokenURI) public returns (uint256) {
        if (bytes(tokenURI).length == 0) {
            revert InvalidTokenURI();
        }
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit NFTMinted(msg.sender, tokenId, tokenURI);
        return tokenId;
    }
    
    /**
     * @dev Updates the token URI for an existing NFT (only owner can update)
     * @param tokenId The token ID to update
     * @param newTokenURI The new token URI
     */
    function updateTokenURI(uint256 tokenId, string memory newTokenURI) public  {
        if (!_exists(tokenId)) {
            revert TokenDoesNotExist();
        }
        if (bytes(newTokenURI).length == 0) {
            revert InvalidTokenURI();
        }
        
        _setTokenURI(tokenId, newTokenURI);
        emit TokenURIUpdated(tokenId, newTokenURI);
    }
    
    /**
     * @dev Batch mints multiple NFTs with custom token URIs
     * @param to The address to mint the NFTs to
     * @param tokenURIs Array of token URIs for each NFT
     * @return Array of token IDs of the minted NFTs
     */
    function batchMint(address to, string[] memory tokenURIs) public  returns (uint256[] memory) {
        uint256[] memory tokenIds = new uint256[](tokenURIs.length);
        
        for (uint256 i = 0; i < tokenURIs.length; i++) {
            if (bytes(tokenURIs[i]).length == 0) {
                revert InvalidTokenURI();
            }
            
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, tokenURIs[i]);
            
            tokenIds[i] = tokenId;
            emit NFTMinted(to, tokenId, tokenURIs[i]);
        }
        
        return tokenIds;
    }
    
    /**
     * @dev Returns the current token counter
     * @return The current token counter value
     */
    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Returns the total supply of minted tokens
     * @return The total number of minted tokens
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Checks if a token exists
     * @param tokenId The token ID to check
     * @return True if the token exists, false otherwise
     */
    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }
    
    // Required overrides for multiple inheritance
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
