"use client";
import { set } from "date-fns";
import React, { useState } from "react";
import { getKaizenEntries } from "../actions/kaizenActions";

const AuthTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();

  const testApiCall = () => {
    setResult(null);
    setLoading(true);
    getKaizenEntries()
      .then((res) => {
        setResult(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container flex items-center gap-4">
      <button className="p-4" onClick={testApiCall}>
        Test API Call
      </button>
      {loading && <span>Loading...</span>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default AuthTest;
