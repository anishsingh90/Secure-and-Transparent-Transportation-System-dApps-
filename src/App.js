import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tripId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_endLocation",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_paymentAmount",
				"type": "uint256"
			}
		],
		"name": "endTrip",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vehicleId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ownerName",
				"type": "string"
			}
		],
		"name": "registerVehicle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vehicleId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_startLocation",
				"type": "string"
			}
		],
		"name": "startTrip",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tripId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "vehicleId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "endLocation",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "paymentAmount",
				"type": "uint256"
			}
		],
		"name": "TripEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tripId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "vehicleId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "startLocation",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			}
		],
		"name": "TripStarted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "vehicleId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ownerName",
				"type": "string"
			}
		],
		"name": "VehicleRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tripId",
				"type": "uint256"
			}
		],
		"name": "getTripDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "vehicleId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "startLocation",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "endLocation",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "paymentAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isCompleted",
						"type": "bool"
					}
				],
				"internalType": "struct SecureTransportationSystem.Trip",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vehicleId",
				"type": "string"
			}
		],
		"name": "getVehicleDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "vehicleId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ownerName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "currentRoute",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isRegistered",
						"type": "bool"
					}
				],
				"internalType": "struct SecureTransportationSystem.Vehicle",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tripCount",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "trips",
		"outputs": [
			{
				"internalType": "string",
				"name": "vehicleId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "startLocation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endLocation",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "paymentAmount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isCompleted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "vehicles",
		"outputs": [
			{
				"internalType": "string",
				"name": "vehicleId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ownerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "currentRoute",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAddress = "0x2deeae8EB5b0631706B68C6CCd2dE57942841273"; // Replace with your contract address

function App() {
  const [account, setAccount] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [tripVehicleId, setTripVehicleId] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [tripId, setTripId] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [tripDetails, setTripDetails] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadWeb3AndBlockchainData = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3);

          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          const myContract = new web3.eth.Contract(contractABI, contractAddress);
          setContract(myContract);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        alert("Please install MetaMask!");
      }
    };

    loadWeb3AndBlockchainData();
  }, []);

  const registerVehicle = async () => {
    if (!contract) return;
    try {
      await contract.methods
        .registerVehicle(vehicleId, ownerName)
        .send({ from: account });
      alert(`Vehicle Registered: ID = ${vehicleId}, Owner = ${ownerName}`);
    } catch (error) {
      console.error("Error registering vehicle:", error);
    }
  };

  const startTrip = async () => {
    if (!contract) return;
    try {
      await contract.methods
        .startTrip(tripVehicleId, startLocation)
        .send({ from: account });
      alert(`Trip Started: Vehicle = ${tripVehicleId}, Start Location = ${startLocation}`);
    } catch (error) {
      console.error("Error starting trip:", error);
    }
  };

  const endTrip = async () => {
    if (!contract) return;
    try {
      await contract.methods
        .endTrip(tripId, endLocation, web3.utils.toWei(paymentAmount, "ether"))
        .send({ from: account });
      alert(`Weldone! Payment Successful: ${paymentAmount} ETH`);
    } catch (error) {
      console.error("Error ending trip:", error);
    }
  };

  const getVehicleDetails = async () => {
    if (!contract) return;
    try {
      const details = await contract.methods.getVehicleDetails(vehicleId).call();
      setVehicleDetails(details);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  const getTripDetails = async () => {
    if (!contract) return;
    try {
      const details = await contract.methods.getTripDetails(tripId).call();
      setTripDetails(details);
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };

  return (
    <div className="App">
      <h1>Secure Transportation System</h1>

      <section className="form-section">
        <h2>Register a Vehicle</h2>
        <input
          type="text"
          placeholder="Vehicle ID"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
        <button onClick={registerVehicle}>Register Vehicle</button>
      </section>

      <section className="form-section">
        <h2>Start a Trip</h2>
        <input
          type="text"
          placeholder="Vehicle ID"
          value={tripVehicleId}
          onChange={(e) => setTripVehicleId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Start Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        />
        <button onClick={startTrip}>Start Trip</button>
      </section>

      <section className="form-section">
        <h2>End a Trip</h2>
        <input
          type="text"
          placeholder="Trip ID"
          value={tripId}
          onChange={(e) => setTripId(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Payment Amount (ETH)"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
        <button onClick={endTrip}>End Trip</button>
      </section>

      <section className="form-section">
        <h2>Get Vehicle Details</h2>
        <input
          type="text"
          placeholder="Vehicle ID"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        />
        <button onClick={getVehicleDetails}>Get Details</button>
        {vehicleDetails && (
          <div>
            <p>Vehicle ID: {vehicleDetails.vehicleId}</p>
            <p>Owner Name: {vehicleDetails.ownerName}</p>
            <p>Current Route: {vehicleDetails.currentRoute}</p>
          </div>
        )}
      </section>

      <section className="form-section">
        <h2>Get Trip Details</h2>
        <input
          type="text"
          placeholder="Trip ID"
          value={tripId}
          onChange={(e) => setTripId(e.target.value)}
        />
        <button onClick={getTripDetails}>Get Details</button>
        {tripDetails && (
          <div>
            <p>Trip ID: {tripDetails.tripId}</p>
            <p>Start Location: {tripDetails.startLocation}</p>
            <p>End Location: {tripDetails.endLocation}</p>
            <p>Payment Amount: {web3.utils.fromWei(tripDetails.paymentAmount, "ether")} ETH</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;