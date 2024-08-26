import React from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ClaimUpdateModal({ claim, onClose, onUpdateClaim }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: claim.status,
      amount_claimed: claim.amount_claimed,
    },
  });

  const onSubmit = async (data) => {
    try {
      const updatedClaim = {
        ...claim,
        ...data,
        amount_claimed: parseFloat(data.amount_claimed),
      };
      await onUpdateClaim(updatedClaim);
      onClose();
    } catch (error) {
      console.error("Error updating claim:", error);
      toast.error("Failed to update claim. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Update Claim</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <FaTimes size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                {...register("status", { required: "Status is required" })}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
            </div>
            <div>
              <label htmlFor="amount_claimed" className="block text-sm font-medium text-gray-700">Amount Claimed</label>
              <input
                type="number"
                step="0.01"
                {...register("amount_claimed", { required: "Amount claimed is required" })}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.amount_claimed && <p className="mt-1 text-sm text-red-600">{errors.amount_claimed.message}</p>}
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Update Claim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}