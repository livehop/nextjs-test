import LoginPage from "@/components/uicomponents/LoginPage";
import React from "react";

const SigninPage = ({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) => {
  return <LoginPage callbackUrl={searchParams.callbackUrl} />;
};

export default SigninPage;
