"use client";
import React, { useEffect, useState } from "react";
import Paging from "@/components/kaizenjournal/Paging";
import SidePanel from "@/components/kaizenjournal/SidePanel";
import { useStore } from "@/infra/stores/Store";
import EditPanel from "@/components/kaizenjournal/EditPanel";
import Toolbar from "@/components/kaizenjournal/table-ui/toolbar";
import DataSticky from "@/components/kaizenjournal/DataSticky";
import { useRouter } from "next/navigation";

const page = () => {
  const { kaizenStore } = useStore();
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.replace("kaizenjournal", undefined);
  }, []);

  const openSidePanel = (openPanel: boolean) => {
    console.log("openSidePanel---------------" + openPanel);
    if (open) {
      kaizenStore.setEditDocumentId(null);
    }
    setOpen(openPanel);
  };

  return (
    <>
      <header className="bg-white shadow flex justify-between">
        <div className="max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Le Journal Kaizen Unique
          </h1>
        </div>
      </header>
      <main>
        <div className="mt-4 px-2">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <Toolbar openSidePanel={openSidePanel} />
            </div>
          </div>
          <DataSticky />
          {/* <Data /> */}
          <div className="mt-8 flow-root px-12">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <EditPanel open={open} setOpen={openSidePanel} />
              <SidePanel open={open} setOpen={openSidePanel} />
            </div>
          </div>
          <div className="px-28">
            <Paging />
            <br />
            <br />
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
