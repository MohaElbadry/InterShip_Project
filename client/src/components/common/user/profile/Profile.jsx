import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import svg from "../../../../assets/edit.svg";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Profile({ userInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const openModal = () => {
    reset({ ...userInfo, date_of_birth: userInfo.date_of_birth.split("T")[0] }); // Pre-fill the form with user info
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const updateUser = async (data) => {
    try {
      const formattedData = {
        name: data.name,
        address: data.address,
        contact_number: data.contact_number,
        date_of_birth: new Date(data.date_of_birth).toISOString(),
        role: "user",
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_API_LINK}/user/${auth.user.id}`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response);
      closeModal();
      window.location.reload(); // Refresh the page after successful update
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [auth.user.id]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg shadow-yellow-50 rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-3xl font-bold text-gray-700">
                  My account
                </h6>
                <button
                  onClick={openModal}
                  className="bg-[#e6c56c] m-4 p-2 rounded-full"
                  type="button"
                >
                  <img src={svg} className="w-6 h-6" alt="edit-icon" />
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 sm:px-4 px-0">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Email address
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        {userInfo.email}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 sm:px-4 px-0">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Name
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        {userInfo.name}
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300"></hr>

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-4/12 sm:px-4 px-0">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Address
                      </label>

                      <p className="border-0 w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring  ease-linear transition-all duration-150">
                        {userInfo.address}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 sm:px-4 px-0">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Number
                      </label>

                      <p className="border-0 w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring  ease-linear transition-all duration-150">
                        {userInfo.contact_number}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 sm:px-4 px-0">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Date-Of-Birth
                      </label>

                      <p className="border-0 w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring  ease-linear transition-all duration-150">
                        {new Date(userInfo.date_of_birth)
                          .toISOString()
                          .substr(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              Update Your Information
            </h3>
            <form onSubmit={handleSubmit(updateUser)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring"
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  {...register("contact_number", {
                    required: "Contact Number is required",
                  })}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring"
                />
                {errors.contact_number && (
                  <p className="text-red-500">
                    {errors.contact_number.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  defaultValue={
                    userInfo.date_of_birth
                      ? new Date(userInfo.date_of_birth)
                          .toISOString()
                          .substr(0, 10)
                      : ""
                  }
                  {...register("date_of_birth", {
                    required: "Date of Birth is required",
                  })}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring"
                />
                {errors.date_of_birth && (
                  <p className="text-red-500">{errors.date_of_birth.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
