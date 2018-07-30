pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./Ownable.sol";
import "./Battle.sol";

contract DragonFactory is Ownable {

    using SafeMath for uint;

    enum DragonStatus { Borned, Killed }

    struct Dragon {
        string name;
        uint img;
        uint attack;
        uint life;
        uint remainLife;
        DragonStatus status;
    }

    uint public dragonAlive;
    Dragon[] public dragons;

    event NewDragon(uint indexed id, string name, uint img, uint attack, uint defence);

    function _createRandomDragon(string _name) private {
        require(dragonAlive == 0);

        uint randImg = uint(keccak256(_name)) % (10 ** 1);
        uint randAtt = ( uint(keccak256(_name)) / 100 ) % (10 ** 3);
        uint randLife = ( uint(keccak256(_name)) / 100000 ) % (10 ** 3);
        uint id = dragons.push(Dragon(_name, randImg, randAtt, randLife, randLife, DragonStatus.Borned)) -1;
        dragonAlive = dragonAlive.add(1);
        emit NewDragon(id, _name, randImg, randAtt, randLife);
    }

    function createRandomDragon(string _name) onlyOwner public {
        _createRandomDragon(_name);
    }

    function getBornedDragons() public view returns (uint) {
        return dragons.length;
    }

}