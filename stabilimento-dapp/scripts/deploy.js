// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("Ottenendo il factory del contratto...");
  const StabilimentoBalneare = await hre.ethers.getContractFactory("StabilimentoBalneare");

  console.log("Deploy del contratto con 30 postazioni...");
  const stabilimento = await StabilimentoBalneare.deploy(30);

  await stabilimento.waitForDeployment();

  console.log(`Contratto deployato all'indirizzo: ${stabilimento.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
