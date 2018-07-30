pragma solidity ^0.4.23;

import "./SafeMath.sol";
import "./Ownable.sol";
import "./DragonFactory.sol";

contract Battle is Ownable, DragonFactory {

    using SafeMath for uint;
    uint public cooldownTime = 30 minutes;
    struct DragonAttacker {
        uint attackDamage;
        uint readyTime;
    }

    mapping(address => uint[]) public dragonsOfAttacker;
    mapping(uint => mapping(address => DragonAttacker)) public dragonAttacker;
    mapping(uint => uint) public dragonAttackerCount;

    function damage(uint _dragonId, uint _attDamage) public returns (bool) {

        bool killed = false;

        require(dragons[_dragonId].status != DragonStatus.Killed, "Dragon is aleady dead...");
        require(isReady(_dragonId, msg.sender));
        require(_attDamage != 0);

        if(dragonAttacker[_dragonId][msg.sender].attackDamage == 0) {
            dragonAttackerCount[_dragonId] = dragonAttackerCount[_dragonId].add(1);
            dragonsOfAttacker[msg.sender].push(_dragonId);
        }

        if(dragons[_dragonId].remainLife <= _attDamage) {
            _attDamage = dragons[_dragonId].remainLife;
            dragons[_dragonId].remainLife = 0;
            killed = _killedDragon(_dragonId);
        }else{
            dragons[_dragonId].remainLife = dragons[_dragonId].remainLife.sub(_attDamage);
        }
        dragonAttacker[_dragonId][msg.sender].attackDamage = dragonAttacker[_dragonId][msg.sender].attackDamage.add(_attDamage);
        dragonAttacker[_dragonId][msg.sender].readyTime = uint(cooldownTime + now);

        return killed;
    }

    function _killedDragon(uint _dragonId) private returns (bool) {
        dragons[_dragonId].status = DragonStatus.Killed;
        dragonAlive = dragonAlive.sub(1);
        return true;
    }

    function isReady(uint _dragonId, address _attacker) public view returns (bool) {
        return (dragonAttacker[_dragonId][_attacker].readyTime <= now);
    }

    function remainNextAttackTime(uint _dragonId, address _attacker) public view returns (int) {
        return int(dragonAttacker[_dragonId][_attacker].readyTime - now);
    }

    // ERC20 게임토큰을 받는다는 가정 하에 실행함
    function resetCoolTime(uint _dragonId, address _attacker) public {
        dragonAttacker[_dragonId][_attacker].readyTime = 0;
    }

    function getDragonsOfAttackerSize(address _attacker) public view returns (uint) {
        return dragonsOfAttacker[_attacker].length;
    }
}