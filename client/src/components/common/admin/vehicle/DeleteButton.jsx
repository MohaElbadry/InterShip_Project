import axios from "axios";
import toast from "react-hot-toast";
import img from "../../../../assets/del3.svg";
import { useAuth } from "../../../../context/AuthContext"; // Use your auth context

function VehicleDeleteButton({ vehicleId }) {
  const { auth } = useAuth();

  const deleteVehicle = async (vehicleId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_LINK}/vehicles/${vehicleId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      toast.success("Vehicle deleted successfully.");
      window.location.reload(); // Optional: Reload the page after successful deletion
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message); // Show specific error message
      } else {
        toast.error("An error occurred while deleting the vehicle.");
      }
    }
  };

  return (
    <button
      onClick={() => deleteVehicle(vehicleId)}
      className="hover:text-red-600 border-2 rounded-full bg-gray-300"
    >
      <img src={img} alt="logo" className="w-8" />
    </button>
  );
}

export default VehicleDeleteButton;
