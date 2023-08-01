// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Election {
    struct Voter {
        bool has_voted; 
        bool is_reg;
        uint256 vote; 
    }
    struct Candidate {
        string candidate_name; 
        uint256 score; 
    }

    address public leader;
    mapping(address => Voter) public voters;

    Candidate[] public candidates;
    constructor(string[] memory candidateNames) {
        leader = msg.sender;
        voters[leader].is_reg = true;
        for (uint64 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({candidate_name: candidateNames[i], score: 0}));
        }
    }

    function registerVoter(address voter) external {
        require(!voters[voter].has_voted, "The voter already voted.");
        require(!voters[voter].is_reg, "Voter is already registered.");
        voters[voter].is_reg=true;
    }

    function Vote(uint256 pref1, uint256 pref2, uint256 pref3) external {
        Voter storage voter = voters[msg.sender];
        require(voter.is_reg, "Voter is not registered.");
        require(!voter.has_voted, "Already voted.");
        candidates[pref1].score+=5;
        candidates[pref2].score+=3;
        candidates[pref3].score+=1;
        voter.has_voted=true;
    }

    function winningCandidate()
        public
        view
        returns (uint256 winningCandidate_)
    {
        uint256 maxVotes = 0;
        uint256 winner = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].score >= maxVotes) {
                winner = i;
                maxVotes = candidates[i].score;
            }
        }
        return winner;
    }  

}