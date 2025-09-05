
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";


import {NftMarketplace} from "../src/NftMarketplace.sol";

contract DeployNftMarketplace is Script {
    function run() external returns (NftMarketplace) {
   

        vm.startBroadcast();
        NftMarketplace nftMarketplace = new NftMarketplace();
  
        vm.stopBroadcast();

        console2.log("Deployed NftMarketplace:", address(nftMarketplace));
        return (nftMarketplace);
    }
}