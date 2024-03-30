"use client";
import React from "react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button
      onClick={() => signIn("id-server", { callbackUrl: "/kaizenjournal" })}
      type="button"
      className="relative rounded-full bg-gray-200 py-2 px-4 text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      Login
    </button>
  );
};

export default LoginButton;
