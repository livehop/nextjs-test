import { getCurrentUser } from "@/app/actions/authActions";
import React from "react";
import ShowSessionButton from "./ShowSessionButton";
import LoginButton from "./LoginButton";

const LoginTester = async () => {
  const user = await getCurrentUser();
  return <div>{user ? <ShowSessionButton /> : <LoginButton />}</div>;
};
export default LoginTester;
