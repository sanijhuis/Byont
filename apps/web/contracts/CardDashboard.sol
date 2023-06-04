// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CardDashboard is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    struct NFTData {
        uint256 tokenId;
        string name;
        string ipfsData;
        string ipfsSvg;
    }


    Counters.Counter private _tokenIdCounter;
    mapping(address => uint256[]) private _ownedTokens;
    mapping(uint256 => string) private _tokenNames;
    mapping(uint256 => string) private _tokenIPFSData;
    mapping(uint256 => string) private _tokenSVGData;

    constructor() ERC721("MyToken", "MTK") {}

    function safeMint(string memory uri, string memory name, string memory ipfsData, string memory svgData) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        _ownedTokens[msg.sender].push(tokenId);
        _tokenNames[tokenId] = name;
        _tokenIPFSData[tokenId] = ipfsData;
        _tokenSVGData[tokenId] = svgData;
    }

function getMyNFTsData() public view returns (NFTData[] memory) {
    uint256 tokenCount = balanceOf(msg.sender);
    NFTData[] memory nftData = new NFTData[](tokenCount);

    uint256[] storage ownedTokens = _ownedTokens[msg.sender];
    for (uint256 i = 0; i < tokenCount; i++) {
        uint256 tokenId = ownedTokens[i];
        nftData[i] = NFTData({
            tokenId: tokenId,
            name: _tokenNames[tokenId],
            ipfsData: _tokenIPFSData[tokenId],
            ipfsSvg: _tokenSVGData[tokenId]
        });
    }

    return nftData;
}


    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        delete _tokenNames[tokenId];
        delete _tokenIPFSData[tokenId];
        _removeToken(msg.sender, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _removeToken(address from, uint256 tokenId) private {
        uint256[] storage tokenList = _ownedTokens[from];
        for (uint256 i = 0; i < tokenList.length; i++) {
            if (tokenList[i] == tokenId) {
                tokenList[i] = tokenList[tokenList.length - 1];
                tokenList.pop();
                break;
            }
        }
    }
}
