import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy RoyaltyFHE contract
  const RoyaltyFHE = await ethers.getContractFactory("RoyaltyFHE");
  const verifier = deployer.address; // Using deployer as verifier for now
  const royaltyFHE = await RoyaltyFHE.deploy(verifier);

  await royaltyFHE.waitForDeployment();

  const contractAddress = await royaltyFHE.getAddress();
  console.log("RoyaltyFHE deployed to:", contractAddress);
  console.log("Verifier address:", verifier);

  // Save deployment info
  const deploymentInfo = {
    network: "sepolia",
    contractAddress: contractAddress,
    verifier: verifier,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  console.log("Deployment completed successfully!");
  console.log("Contract Address:", contractAddress);
  console.log("Verifier:", verifier);
  console.log("Deployer:", deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });