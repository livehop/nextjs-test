import React from "react";
import { getSession, getTokenWorkaround } from "../actions/authActions";
import AuthTest from "./AuthTest";

const SessionInfo = async () => {
  const session = await getSession();
  const token = await getTokenWorkaround();

  return (
    <div className="container">
      <header className="bg-white shadow flex justify-between">
        <div className="max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Session Information
          </h1>
        </div>
      </header>
      <div className="m-2 bg-blue-200 border-2 rounded-md border-blue-500 max-w-5xl overflow-auto">
        <div className="p-4">
          <h2 className="text-lg font-bold">Session data</h2>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </div>
      <div className="m-2 bg-green-50 border-2 rounded-md border-blue-500 max-w-5xl overflow-auto">
        <div className="p-4">
          <h2 className="text-lg font-bold">Token data</h2>
          <pre>{JSON.stringify(token, null, 2)}</pre>
        </div>
      </div>
      <AuthTest />
    </div>
  );
};

export default SessionInfo;
