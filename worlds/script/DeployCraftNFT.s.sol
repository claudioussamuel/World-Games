// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";


import {CraftNFT} from "../src/CraftNFT.sol";

contract DeployCraftNFT is Script {
    function run() external returns (CraftNFT) {
   

        vm.startBroadcast();
        CraftNFT craftNFT = new CraftNFT();
  
        vm.stopBroadcast();

        console2.log("Deployed CraftNFT:", address(craftNFT));
        return (craftNFT);
    }
}
