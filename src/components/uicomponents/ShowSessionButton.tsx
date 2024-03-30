"use client";
import Link from "next/link";
import React from "react";

const ShowSessionButton = () => {
  return (
    <button className="p-4">
      <Link href="/session">View Session Data</Link>
    </button>
  );
};

export default ShowSessionButton;
