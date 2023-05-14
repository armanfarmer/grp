// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract GPURegistration is Ownable, Pausable {
    struct GPU {
        string uniqueIdentifier;
        address owner;
        bool isRegistered;
    }

    mapping(string => GPU) public gpus;

    event GPURegistered(string uniqueIdentifier, address owner);
    event GPUTransferred(string uniqueIdentifier, address from, address to);

    function registerGPU(string memory _uniqueIdentifier) public whenNotPaused {
        require(!gpus[_uniqueIdentifier].isRegistered, "This GPU is already registered.");
        gpus[_uniqueIdentifier] = GPU(_uniqueIdentifier, msg.sender, true);
        emit GPURegistered(_uniqueIdentifier, msg.sender);
    }

    function transferGPU(string memory _uniqueIdentifier, address _newOwner) public whenNotPaused {
        require(gpus[_uniqueIdentifier].owner == msg.sender, "Only the current owner can transfer the GPU.");
        gpus[_uniqueIdentifier].owner = _newOwner;
        emit GPUTransferred(_uniqueIdentifier, msg.sender, _newOwner);
    }

    function verifyGPU(string memory _uniqueIdentifier) public view returns(bool, address) {
        return (gpus[_uniqueIdentifier].isRegistered, gpus[_uniqueIdentifier].owner);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
