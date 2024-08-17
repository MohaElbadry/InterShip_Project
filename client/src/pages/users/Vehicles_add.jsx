import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Vehicles_add() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // Parse numerical values to integers
    const formattedData = {
      user_id: parseInt(data.user_id, 10), // Ensure user_id is an integer
      make: data.make,
      model: data.model,
      year: parseInt(data.year, 10), // Ensure year is an integer
      license_plate: data.license_plate,
      vin_number: data.vin_number,
    };

    // Create FormData to include file upload
    const formData = new FormData();
    for (const key in formattedData) {
      formData.append(key, formattedData[key]);
    }

    if (data.picture && data.picture[0]) {
      formData.append("picture", data.picture[0]); // Append the file
    }

    // Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/vehicles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response data:", response.data);
      reset();
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        name="user_id"
        placeholder="User ID"
        {...register("user_id")}
      />
      <input type="text" name="make" placeholder="Make" {...register("make")} />
      <input
        type="text"
        name="model"
        placeholder="Model"
        {...register("model")}
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        {...register("year")}
      />
      <input
        type="text"
        name="license_plate"
        placeholder="License Plate"
        {...register("license_plate")}
      />
      <input
        type="text"
        name="vin_number"
        placeholder="VIN Number"
        {...register("vin_number")}
      />
      <input type="file" name="picture" {...register("picture")} />
      <button type="submit">Submit</button>
    </form>
  );
}
