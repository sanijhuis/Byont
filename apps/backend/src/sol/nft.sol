// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenCounter;

    constructor() ERC721("SimpleNFT", "SNFT") {
        _tokenCounter = 0;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenCounter = _tokenCounter + 1;
        _mint(recipient, _tokenCounter);
        _setTokenURI(_tokenCounter, tokenURI);
        return _tokenCounter;
    }
}
