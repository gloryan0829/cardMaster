pragma solidity ^0.4.23;

import "./Ownable.sol";
import "./Token.sol";
import "./ItemFactory.sol";

contract ItemTrading is Ownable {

    ItemFactory public itemFactory;
    GameToken public gameToken;

    event BuyCard(address indexed _purchaser, address _prevOwner,uint indexed tokenId, uint _price, uint32 _date);

    constructor(ItemFactory _itemFactory, GameToken _token) public {
        itemFactory = ItemFactory(_itemFactory);
        gameToken = GameToken(_token);
    }

    function buyCard(uint _tokenId, uint _price) public returns (bool) {
        require(itemFactory.getItemSellingAvailable(_tokenId)
            && !(getOwnerOfToken(_tokenId) == msg.sender
            && itemFactory.balanceOf(msg.sender) >= _price
            ),"buyCard conditions not matched...");

        gameToken.transferFrom(msg.sender, getOwnerOfToken(_tokenId), _price);

        itemFactory.transferFrom(getOwnerOfToken(_tokenId), msg.sender, _tokenId);
        emit BuyCard(msg.sender, getOwnerOfToken(_tokenId), _tokenId, _price, uint32(now));
        return true;
    }

    function getOwnerOfToken(uint _tokenId) public view returns (address) {
        return itemFactory.ownerOf(_tokenId);
    }

    function setCardFactoryAddr(address _cardAddr) onlyOwner public {
        itemFactory = ItemFactory(_cardAddr);
    }

    function setCardTokenAddr(address _tokenAddr) onlyOwner public {
        gameToken = GameToken(_tokenAddr);
    }

}