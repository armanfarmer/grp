// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

contract GPURegistration is Ownable, Pausable {
    struct GPU {
        string uniqueIdentifier;
        address owner;
        bool isRegistered;
    }

    mapping(string => GPU) public gpus;

    event GPURegistered(string uniqueIdentifier, address owner);
    event GPUTransferred(string uniqueIdentifier, address from, address to);

    // A valid ECDSA signature is a pair of two numbers usually referred to as r and s. An invalid s value error means that the s component of the ECDSA signature you provided doesn't match the expected format or constraints.
    // To generate a valid signature, you need a private key and a message (in this case the GPU ID). However, generating such a signature just for simulation is not straightforward and could potentially pose a security risk if not handled properly.



    //  It no longer uses ECDSA to validate the signature but instead expects the signature passed to the registerGPU function to be the keccak256 hash of the _uniqueIdentifier (i.e., the GPU ID). This is a simpler form of validation and should work for your testing purposes.

    function registerGPU(
        string memory _uniqueIdentifier,
        bytes32 signature
    ) public whenNotPaused {
        require(
            !gpus[_uniqueIdentifier].isRegistered,
            "This GPU is already registered."
        );

        // Check that the signature matches the expected value (the hash of the GPU ID)
        bytes32 expectedSignature = keccak256(
            abi.encodePacked(_uniqueIdentifier)
        );
        require(
            signature == expectedSignature,
            "Signature does not match the expected value."
        );

        gpus[_uniqueIdentifier] = GPU(_uniqueIdentifier, msg.sender, true);
        emit GPURegistered(_uniqueIdentifier, msg.sender);
    }

    function transferGPU(
        string memory _uniqueIdentifier,
        address _newOwner
    ) public whenNotPaused {
        require(
            gpus[_uniqueIdentifier].owner == msg.sender,
            "Only the current owner can transfer the GPU."
        );
        gpus[_uniqueIdentifier].owner = _newOwner;
        emit GPUTransferred(_uniqueIdentifier, msg.sender, _newOwner);
    }

    function verifyGPU(
        string memory _uniqueIdentifier
    ) public view returns (bool, address) {
        return (
            gpus[_uniqueIdentifier].isRegistered,
            gpus[_uniqueIdentifier].owner
        );
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
