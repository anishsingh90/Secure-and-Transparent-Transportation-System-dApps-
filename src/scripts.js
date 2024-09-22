// scripts.js

// Register a vehicle
function registerVehicle() {
    const vehicleId = document.getElementById('vehicleId').value;
    const ownerName = document.getElementById('ownerName').value;

    // Simulate action: Alert and show dummy data (Later replace with actual contract logic)
    alert(`Vehicle Registered: ID = ${vehicleId}, Owner = ${ownerName}`);
}

// Start a trip
function startTrip() {
    const vehicleId = document.getElementById('tripVehicleId').value;
    const startLocation = document.getElementById('startLocation').value;

    // Simulate action: Alert and show dummy data (Later replace with actual contract logic)
    alert(`Trip Started: Vehicle = ${vehicleId}, Start Location = ${startLocation}`);
}

// End a trip with a success notification
function endTrip() {
    const tripId = document.getElementById('tripId').value;
    const endLocation = document.getElementById('endLocation').value;
    const paymentAmount = document.getElementById('paymentAmount').value;

    // Simulate action: Display dummy data and success message (Later replace with actual contract logic)
    alert(`Trip Ended: ID = ${tripId}, End Location = ${endLocation}, Payment = ${paymentAmount} ETH`);

    // Show a success notification after trip ends
    document.getElementById('tripDetails').innerHTML = `Trip ID: ${tripId}, Ended at: ${endLocation}, Payment: ${paymentAmount} ETH<br><strong>Weldone! Payment Successful</strong>`;
}

// Get vehicle details
function getVehicleDetails() {
    const vehicleId = document.getElementById('vehicleDetailsId').value;

    // Simulate action: Display dummy data (Later replace with actual contract logic)
    document.getElementById('vehicleDetails').innerHTML = `Vehicle Details: ID = ${vehicleId}, Owner = John Doe, Route = City A`;
}

// Get trip details
function getTripDetails() {
    const tripId = document.getElementById('tripDetailsId').value;

    // Simulate action: Display dummy data (Later replace with actual contract logic)
    document.getElementById('tripDetails').innerHTML = `Trip Details: ID = ${tripId}, Start = City A, End = City B, Payment = 0.5 ETH`;
}
