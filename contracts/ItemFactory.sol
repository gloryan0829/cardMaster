pragma solidity ^0.4.23;

import "./ERC721.sol";
import "github.com/Arachnid/solidity-stringutils/strings.sol";


contract ItemFactory is ERC721Token, Ownable {

    enum ItemSellingStatus { AVAIL, UNAVAIL }


    using SafeMath for uint;
    using strings for *;
    uint tokenSeq;
    string baseURI;

    struct ItemExtInfo {
        ItemSellingStatus status;
        uint itemSellingPrice;
    }

    mapping(uint => ItemExtInfo) public itemPriceInfo;

    constructor(string _tokenName, string _tokenSymbol) ERC721Token(_tokenName, _tokenSymbol) public {
        tokenSeq = 0;
        baseURI = "http://localhost:8080/api/items/";
    }

    // only owner of this contract can execute this function
    function createItem() onlyOwner public {
        require(!exists(tokenSeq), "This token is already exists");
        _mint(owner, tokenSeq);
        _setTokenURI(tokenSeq, baseURI.toSlice().concat(uintToString(tokenSeq).toSlice()));
        itemPriceInfo[tokenSeq] = ItemExtInfo({ status : ItemSellingStatus.UNAVAIL, itemSellingPrice : 10000 });
        tokenSeq = tokenSeq.add(1);
    }

    function burn(uint256 _tokenId) onlyOwnerOf(_tokenId) public {
        _burn(ownerOf(_tokenId), _tokenId);
    }

    function setTokenURI(uint256 tokenId, string uri) onlyOwner public {
        _setTokenURI(tokenId, uri);
    }

    function setTokenInfoURIBase(string _uri) onlyOwner public {
        baseURI = _uri;
    }

    function itemSellingAvailable(uint256 tokenId) public view returns (bool) {
        return ( itemPriceInfo[tokenId].status == ItemSellingStatus.AVAIL? true:false);
    }

    function setItemSellingPrice(uint _tokenId, uint _price) onlyOwnerOf(_tokenId) public {
        itemPriceInfo[_tokenId].itemSellingPrice = _price;
    }

    function uintToString(uint v) public pure returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        str = string(s);
    }

}