import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
const contractAddress = "0x5285346bF45709ECd8aB90B03135458C4fd9167B";
const contractABI = [
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

function App() {
  const [number, setNumber] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNumber();
  }, []);

  const fetchNumber = async () => {
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const result = await contract.retrieve();
      setNumber(result.toNumber());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching number:", error);
      setError("Error fetching number. Please try again.");
      setLoading(false);
    }
  };

  const handleStore = async () => {
    if (!inputValue) {
      setError("Please enter a number");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await contract.store(inputValue);
      await transaction.wait();
      setInputValue("");
      setLoading(false);
      fetchNumber();
    } catch (error) {
      console.error("Error storing number:", error);
      setError("Error storing number. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Storage Dapp</h1>
      <div>
        <p>Current Number: {loading ? "Loading..." : number}</p>
        <button onClick={fetchNumber} disabled={loading}>
          Refresh
        </button>
      </div>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
        />
        <button onClick={handleStore} disabled={loading}>
          Store
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default App;

