import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const locationsRef = collection(firestore, "locations");

    // Listen for real-time updates to locations collection
    const unsubscribe = onSnapshot(locationsRef, (snapshot) => {
      const updatedLocations = [];
      snapshot.forEach((doc) => {
        const { latitude, longitude, timestamp } = doc.data();
        updatedLocations.push({
          id: doc.id,
          latitude,
          longitude,
          timestamp
        });
      });
      setLocations(updatedLocations);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []); // Empty dependency array to run once on component mount

  return (
    <div>
      <h2>Location List</h2>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            Latitude: {location.latitude}, Longitude: {location.longitude}, Timestamp: {location.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
