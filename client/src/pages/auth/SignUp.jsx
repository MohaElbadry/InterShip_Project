import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import logo from "../../assets/allianz-logo-2.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Footer from "../../components/layout/Footer";

export default function SignUp() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [serverError, setServerError] = useState(""); // State to handle server errors

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      contact_number: "",
      date_of_birth: "",
      role: "user",
    },
  });

  // Watch for password and confirmPassword fields
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (auth) {
      navigate(auth.user.role === "admin" ? "/admin" : "/user", {
        replace: true,
      });
    }
  }, [auth, navigate]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setServerError("Passwords do not match");
      return;
    }

    try {
      const formattedDateOfBirth = new Date(data.date_of_birth).toISOString();

      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/user`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          address: data.address,
          contact_number: data.contact_number,
          date_of_birth: formattedDateOfBirth,
          role: data.role,
        }
      );

      if (response.data.status) {
        setAuth({ token: response.data.token, user: response.data.user });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate(response.data.user.role === "admin" ? "/admin" : "/user");
      } else {
        setServerError(response.data.error || "Sign Up failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setServerError(error.response.data.error || "Sign Up failed");
      } else {
        console.error(error);
        setServerError("An error occurred during sign up");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="overflow-hidden flex justify-center items-center bg-white mb-10">
        <div className="p-10 border-[2px] pb-0 mt-0 sm:mt-4 border-slate-200 rounded-md flex flex-col items-center space-y-3">
          <div className="py-8 flex justify-center">
            <img className="-mt-6 sm:w-1/4 w-1/2" src={logo} />
          </div>
          {/* FORM */}
          <form
            className="w-full flex flex-col items-center space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
              placeholder="Name"
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}

            <input
              className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
              placeholder="E-Mail"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}

            <input
              className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}

            <input
              className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword.message}</p>
            )}
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-red-600">Passwords do not match</p>
            )}

            <input
              className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
              placeholder="Address"
              type="text"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-600">{errors.address.message}</p>
            )}

            <input
              className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
              placeholder="Contact Number"
              type="tel"
              {...register("contact_number", {
                required: "Contact number is required",
              })}
            />
            {errors.contact_number && (
              <p className="text-red-600">{errors.contact_number.message}</p>
            )}

            <input
              className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
              placeholder="Date of Birth (YYYY-MM-DD)"
              type="date"
              {...register("date_of_birth", {
                required: "Date of birth is required",
              })}
            />
            {errors.date_of_birth && (
              <p className="text-red-600">{errors.date_of_birth.message}</p>
            )}

            {/* Display server error */}
            {serverError && <p className="text-red-600">{serverError}</p>}

            <div className="flex flex-col items-center space-y-5 w-full">
              <button
                type="submit"
                className="w-3/4 sm:w-1/2 bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center space-y-5 w-full">
            <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
              <div className="font-bod bg-white mt-1 px-5 absolute">Or</div>
            </div>
            <a
              href="/login"
              className="btn w-3/4 sm:w-1/2  text-center border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200"
            >
              Log In
            </a>
          </div>

          <div className="flex space-x-1 p-20 text-sm">
            <p className="hover:underline cursor-pointer">Proximité</p>
            <div className="border-r-[1px] border-r-slate-300"></div>
            <p className="font-bold hover:underline cursor-pointer">
              Expertise
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
