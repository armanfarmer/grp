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

async function getTEESignature(gpuId: string) {
  // Simulate delay for getting TEE signature
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      // Generate the expected signature value by hashing the GPU ID.
      const signature = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(gpuId));
      resolve(signature);
    }, 3000);
  });
}

const InteractWithContract = () => {
  const [gpuId, setGpuId] = useState("");
  const [gpuOwner, setGpuOwner] = useState("");
  const [signature, setSignature] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredGPUs, setRegisteredGPUs] = useState<GPU[]>([]);

  const contractAddress = "0xb1Cddc2346B1c129205D9D62f58471A4f590183B";
  const contractABI = require('./contracts/GPURegistration.json').abi;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  useEffect(() => {
    const fetchRegisteredGPUs = async () => {
      const eventFilter = contract.filters.GPURegistered();
      const events = await contract.queryFilter(eventFilter);
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

  const handleGetSignature = async () => {
    setIsLoading(true);
    const signature = await getTEESignature(gpuId);
    setSignature(signature);
    setIsLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!signature) {
      alert("Please get the TEE signature before registering the GPU.");
      return;
    }

    try {
      const tx = await contract.registerGPU(gpuId, signature);
      await tx.wait();
      alert("GPU registered successfully!");
      setSignature(null); // Clear the signature after successful registration
    } catch (err) {
      console.error(err);
      alert("Failed to register GPU. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Interact with GPU Registration Contract</h2>
      <p>
        Enter the GPU ID and get the TEE signature to register your Nvidia GPU.
        Once the GPU is registered, it will appear in the list of registered GPUs below.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          GPU ID:
          <input
            type="text"
            value={gpuId}
            onChange={(e) => setGpuId(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleGetSignature}        >
          {isLoading ? "Getting TEE signature..." : "Get TEE signature"}
        </button>
        {signature && <p>TEE signature received. You can now register your GPU.</p>}
        <button type="submit" disabled={!signature}>Register GPU</button>
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