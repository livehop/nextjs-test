import TopNav from "@/components/kaizenjournal/TopNav";
import React from "react";
import { getCurrentUser } from "../actions/authActions";
import { Toaster } from "@/components/ui/toaster";

const KaizenLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  return (
    <>
      <div className="min-h-full">
        <TopNav user={user} />
        {/* <LoginTester /> */}
        <Toaster />
        <>{children}</>
      </div>
    </>
  );
};

export default KaizenLayout;
