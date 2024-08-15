import React from "react";
import Login from "../components/layout/Header";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1 className=" w-full text-center text-3xl font-bold mt-9">DASH</h1>
      <Link
        to="/login"
        className="btn bg-slate-200 text-4xl text-center mx-auto w-full h-full"
      >
        Login
      </Link>
    </>
  );
}
