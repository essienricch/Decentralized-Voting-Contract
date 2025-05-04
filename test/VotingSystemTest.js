const { expect } = require("chai");

describe("VotingSystem", function () {
  let VotingSystem, voting, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    VotingSystem = await ethers.getContractFactory("VotingSystem");
    voting = await VotingSystem.deploy();
    //await voting.deployed();
  });

  it("should allow the owner to add candidates", async function () {
    await voting.addCandidate("Alice");
    const [name, votes] = await voting.getCandidate(0);
    expect(name).to.equal("Alice");
    expect(votes).to.equal(0);
  });

  it("should not allow non-owner to add candidates", async function () {
    await expect(
      voting.connect(addr1).addCandidate("Bob")
    ).to.be.revertedWith("Not owner");
  });

  it("should allow users to vote", async function () {
    await voting.addCandidate("Charlie");
    await voting.connect(addr1).vote(0);
    const [_, votes] = await voting.getCandidate(0);
    expect(votes).to.equal(1);
  });

  it("should prevent double voting", async function () {
    await voting.addCandidate("David");
    await voting.connect(addr1).vote(0);
    await expect(voting.connect(addr1).vote(0)).to.be.revertedWith("Already voted");
  });

  it("should return total candidates", async function () {
    await voting.addCandidate("Eve");
    await voting.addCandidate("Frank");
    const total = await voting.getTotalCandidates();
    expect(total).to.equal(2);
  });
});
