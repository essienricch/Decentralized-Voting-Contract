// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Ownable {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }
}

contract VotingSystem is Ownable {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidateCount;

    function addCandidate(string calldata name) external onlyOwner {
        candidates[candidateCount] = Candidate(candidateCount, name, 0);
        candidateCount++;
    }

    function vote(uint candidateId) external {
        require(!voters[msg.sender], "Already voted");
        require(candidateId < candidateCount, "Invalid candidate");

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;
    }

    function getCandidate(uint candidateId) public view returns (string memory name, uint voteCount) {
        require(candidateId < candidateCount, "Invalid candidate");
        Candidate storage candidate = candidates[candidateId];
        return (candidate.name, candidate.voteCount);
    }

    function getTotalCandidates() public view returns (uint) {
        return candidateCount;
    }
}