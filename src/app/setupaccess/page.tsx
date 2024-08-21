"use client";
import React, { useState } from "react";
import { useStore } from "@/infra/stores/Store";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const currentYear = new Date().getFullYear();

function EditKaizenFallback() {
  return <>Loading ...</>;
}

const SetupAccess = () => {
  const { userStore } = useStore();
  const { setRole } = userStore;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setOperator = () => {
    setLoading(true);
    setRole(null);
    router.replace("kaizenjournal", undefined);
  };
  const setEngineer = () => {
    setLoading(true);
    setRole("engineer");
    router.replace("kaizenjournal", undefined);
  };

  const setAdmin = () => {
    setLoading(true);
    setRole("adm");
    router.replace("kaizenjournal", undefined);
  };

  return (
    <>
      <header className="bg-white shadow flex justify-between">
        <div className="flex justify-between w-10/12 items-center px-2 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Set up access level
          </h1>
        </div>
      </header>
      <main>
        <div className="mt-4 px-2">
          <div className="sm:flex sm:items-center">
            {loading ? (
              <div className="sm:flex-auto">
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              </div>
            ) : (
              <div className="sm:flex-auto">
                <Button variant={"outline"} onClick={setOperator}>
                  Set As operator
                </Button>
                <Button variant={"secondary"} onClick={setEngineer}>
                  Set As Engineer
                </Button>
                <Button variant={"destructive"} onClick={setAdmin}>
                  Set As Administrator
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default observer(SetupAccess);
