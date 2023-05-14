import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
// @ts-ignore
import NvidiaGraphic from './assets/nvidia-graphic.jpeg';

declare global {
  interface Window { ethereum: any; }
}

type GPU = {
  id: string;
  owner: string;
};


const InteractWithContract = () => {
  const [gpuId, setGpuId] = useState("");
  const [gpuOwner, setGpuOwner] = useState("");
  const [registeredGPUs, setRegisteredGPUs] = useState<GPU[]>([]);



  const contractAddress = "0x9C63610b0f8BcA7cC085cBaEd828b33A3a85B3c2";
  const contractABI = require('./contracts/GPURegistration.json').abi;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  

  useEffect(() => {
    const fetchRegisteredGPUs = async () => {
      const eventFilter = contract.filters.GPURegistered(); // Define filter for GPURegistered events
      const events = await contract.queryFilter(eventFilter); // Fetch the events
    
      // Extract and format the GPUs data
      const formattedGPUs = events.map((event) => {
        const gpuId = event.args?.uniqueIdentifier;
        const gpuOwner = event.args?.owner;
        return { id: gpuId, owner: gpuOwner };
      });
    
      setRegisteredGPUs(formattedGPUs);
    };
    fetchRegisteredGPUs();
  }, [contract]);

  useEffect(() => {
    const checkNetwork = async () => {
      const network = await provider.getNetwork();
      if (network.name !== 'goerli') {
        alert('Please switch to Goerli network');
      }
    }
    
    checkNetwork();
  }, [provider]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const tx = await contract.registerGPU(gpuId); // Only pass gpuId
      await tx.wait();
      alert("GPU registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to register GPU. Check console for details.");
    }
  };
  return (
    <div>
      <h2>Interact with GPU Registration Contract</h2>
      <p>
        Enter the GPU ID and your name to register your Nvidia GPU.
        Once the GPU is registered, it will appear in the list of registered GPUs below.
      </p>
      {/* <img src={NvidiaGraphic} alt="Nvidia GPU" /> */}
      <form onSubmit={handleSubmit}>
        <label>
          GPU ID:
          <input
            type="text"
            value={gpuId}
            onChange={(e) => setGpuId(e.target.value)}
          />
        </label>
        <button type="submit">Register GPU</button>
        <label>
          GPU Owner:
          <input
            type="text"
            value={gpuOwner}
            onChange={(e) => setGpuOwner(e.target.value)}
          />
        </label>
        <button type="submit">Register GPU</button>
      </form>
      <h2>Registered GPUs</h2>
      <ul>
        {registeredGPUs.map((gpu, index) => (
          <li key={index}>
            {`ID: ${gpu.id}, Manufacturer: Nvidia, Owner: ${gpu.owner}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InteractWithContract;
