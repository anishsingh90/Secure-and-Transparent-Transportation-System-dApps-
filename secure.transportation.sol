// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecureTransportationSystem {
    // Struct to store vehicle details
    struct Vehicle {
        string vehicleId;
        string ownerName;
        string currentRoute;
        bool isRegistered;
    }

    // Struct to store trip details
    struct Trip {
        string vehicleId;
        string startLocation;
        string endLocation;
        uint startTime;
        uint endTime;
        uint paymentAmount;
        bool isCompleted;
    }

    // Mapping to store registered vehicles
    mapping(string => Vehicle) public vehicles;

    // Mapping to store trip details by trip ID
    mapping(uint => Trip) public trips;

    // Counter for trip IDs
    uint public tripCount = 0;

    // Event to notify vehicle registration
    event VehicleRegistered(string vehicleId, string ownerName);

    // Event to notify trip started
    event TripStarted(
        uint tripId,
        string vehicleId,
        string startLocation,
        uint startTime
    );

    // Event to notify trip ended
    event TripEnded(
        uint tripId,
        string vehicleId,
        string endLocation,
        uint endTime,
        uint paymentAmount
    );

    // Register a vehicle
    function registerVehicle(
        string memory _vehicleId,
        string memory _ownerName
    ) public {
        require(
            !vehicles[_vehicleId].isRegistered,
            "Vehicle is already registered."
        );

        vehicles[_vehicleId] = Vehicle({
            vehicleId: _vehicleId,
            ownerName: _ownerName,
            currentRoute: "",
            isRegistered: true
        });

        emit VehicleRegistered(_vehicleId, _ownerName);
    }

    // Start a trip
    function startTrip(
        string memory _vehicleId,
        string memory _startLocation
    ) public {
        require(
            vehicles[_vehicleId].isRegistered,
            "Vehicle is not registered."
        );

        tripCount++;
        trips[tripCount] = Trip({
            vehicleId: _vehicleId,
            startLocation: _startLocation,
            endLocation: "",
            startTime: block.timestamp,
            endTime: 0,
            paymentAmount: 0,
            isCompleted: false
        });

        vehicles[_vehicleId].currentRoute = _startLocation;

        emit TripStarted(
            tripCount,
            _vehicleId,
            _startLocation,
            block.timestamp
        );
    }

    // End a trip
    function endTrip(
        uint _tripId,
        string memory _endLocation,
        uint _paymentAmount
    ) public {
        Trip storage trip = trips[_tripId];
        require(!trip.isCompleted, "Trip is already completed.");

        trip.endLocation = _endLocation;
        trip.endTime = block.timestamp;
        trip.paymentAmount = _paymentAmount;
        trip.isCompleted = true;

        vehicles[trip.vehicleId].currentRoute = _endLocation;

        emit TripEnded(
            _tripId,
            trip.vehicleId,
            _endLocation,
            block.timestamp,
            _paymentAmount
        );
    }

    // Retrieve vehicle details
    function getVehicleDetails(
        string memory _vehicleId
    ) public view returns (Vehicle memory) {
        return vehicles[_vehicleId];
    }

    // Retrieve trip details
    function getTripDetails(uint _tripId) public view returns (Trip memory) {
        return trips[_tripId];
    }
}
