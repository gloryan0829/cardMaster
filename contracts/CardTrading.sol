pragma solidity ^0.4.23;

import "./Ownable.sol";
import "./Token.sol";
import "./ERC721.sol";
import "./CardFactory.sol";

contract CardTradingInterface {
    function buyCard(uint _price) public returns (bool);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
    event BuyCard(address indexed _purchaser, address _prevOwner,uint indexed tokenId, uint _price, uint32 _date);
}

contract CardTrading is CardTradingInterface, Ownable {

    CardFactory cardFactory;
    CardToken cardToken;

    constructor(CardFactory _cardAddr, CardToken _token) public {
        cardFactory = CardFactory(_cardAddr);
        cardToken = CardToken(_token);
    }

    function buyCard(address _purchaser, uint _tokenId, uint _price) public {
        require(cardFactory.cardSellingAvailable(_tokenId)
            && !(cardFactory.ownerOf(_tokenId) == _purchaser
            && cardToken.balanceOf(_purchaser) >= _price
            && msg.sender == _purchaser
            ),"buyCard conditions not matched...");

        cardToken.approve(this, _price);
        emit Approval(_purchaser, this,  _price);

        cardToken.transferFrom(_purchaser, cardFactory.ownerOf(_tokenId), _price);

        cardFactory.approve(this, _tokenId);
        cardFactory.transferFrom(cardFactory.ownerOf(_tokenId), _purchaser, _tokenId);
        emit BuyCard(_purchaser, cardFactory.ownerOf(_tokenId), _tokenId, _price, uint32(now));
    }

    function setCardFactoryAddr(address _cardAddr) onlyOwner public {
        cardFactory = CardFactory(_cardAddr);
    }

    function setCardTokenAddr(address _tokenAddr) onlyOwner public {
        cardToken = CardToken(_tokenAddr);
    }

}