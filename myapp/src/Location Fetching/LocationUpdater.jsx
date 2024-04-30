import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

const LocationUpdater = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Function to fetch live location from browser
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const timestamp = new Date().toISOString();

          const locationData = {
            latitude,
            longitude,
            timestamp
          };

          // Save location data to Firestore
          addDoc(collection(firestore, "locations"), locationData);
          setCurrentLocation(locationData);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    // Fetch location initially
    fetchLocation();

    // Fetch location every minute
    const interval = setInterval(fetchLocation, 5000); // 60000 milliseconds = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Live Location Updates</h2>
      {currentLocation && (
        <p>
          Latitude: {currentLocation.latitude}, Longitude: {currentLocation.longitude}
        </p>
      )}
    </div>
  );
};

export default LocationUpdater;
