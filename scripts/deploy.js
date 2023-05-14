async function main() {
    const GPURegistration = await ethers.getContractFactory("GPURegistration");
    const contract = await GPURegistration.deploy();
  
    console.log("Contract deployed to address:", contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  