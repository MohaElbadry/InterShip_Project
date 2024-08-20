import React from "react";
import img from "../../../../assets/del3.svg";
export default function VehicleRow({ vehicle, onDelete }) {
  return (
    <>
      <tr className="bg-gray-50  hover:bg-gray-100 text-gray-700">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
              <img
                className="object-cover w-full h-full rounded-full"
                src={`${process.env.REACT_APP_API_LINK}${vehicle.picture_url}`}
                loading="lazy"
                alt={`Picture of ${vehicle.make} ${vehicle.model}`}
              />
              <div
                className="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              ></div>
            </div>
            <div>
              <p className="font-semibold">{vehicle.make}</p>
              <p className="text-xs text-gray-600 ">{vehicle.model}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{vehicle.license_plate}</td>
        <td className="px-4 py-3 text-xs">
          <span
            className={`px-2 py-1 font-semibold leading-tight rounded-full ${vehicle.vin_number}`}
          >
            {vehicle.vin_number}
          </span>
        </td>
        <td className="px-4 py-3 text-sm">{vehicle.year}</td>
        <td className="px-4 py-3 text-sm">
          <button
            onClick={onDelete}
            className=" hover:text-red-800 border-2p-2 rounded-full text-white btn"
          >
            <img src={img} alt="logo" className="w-8 " />
          </button>
        </td>
      </tr>
    </>
  );
}
