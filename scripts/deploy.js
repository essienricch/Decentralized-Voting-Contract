const hre = require("hardhat");

async function main() {
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const voting = await VotingSystem.deploy();

  await voting.waitForDeployment(); // For ethers v6+
  const address = await voting.getAddress(); // Get the deployed address

  console.log(`Contract deployed to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
