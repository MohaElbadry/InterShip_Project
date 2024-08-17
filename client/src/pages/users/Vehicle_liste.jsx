import React, { useEffect, useState } from "react";
import axios from "axios";

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/vehicles`
        );
        setVehicles(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Vehicles</h1>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <p>User ID: {vehicle.user_id}</p>
            <p>Make: {vehicle.make}</p>
            <p>Model: {vehicle.model}</p>
            <p>Year: {vehicle.year}</p>
            <p>License Plate: {vehicle.license_plate}</p>
            <p>VIN Number: {vehicle.vin_number}</p>
            <p>Picture URL: {vehicle.picture_url}</p>
            <img
              src={`${process.env.REACT_APP_API_LINK}${vehicle.picture_url}`}
              alt={`Picture of ${vehicle.make} ${vehicle.model}`}
              style={{ width: "100px", height: "auto" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehiclesList;
