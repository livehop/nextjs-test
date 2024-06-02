"use client";
import React, { Suspense, useEffect, useState } from "react";
import Paging from "@/components/kaizenjournal/Paging";
import SidePanel from "@/components/kaizenjournal/SidePanel";
import { useStore } from "@/infra/stores/Store";
import EditPanel from "@/components/kaizenjournal/EditPanel";
import Toolbar from "@/components/kaizenjournal/table-ui/toolbar";
import DataSticky from "@/components/kaizenjournal/DataSticky";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";

const currentYear = new Date().getFullYear();

function EditKaizenFallback() {
  return <>Loading ...</>;
}

const KaizenJournal = () => {
  const { kaizenStore } = useStore();
  const { loadRecordMetrics, recordMetrics } = kaizenStore;
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadRecordMetrics();
    router.replace("kaizenjournal", undefined);
  }, [loadRecordMetrics, router]);

  const openSidePanel = (openPanel: boolean) => {
    console.log("openSidePanel---------------" + openPanel);
    if (open) {
      //kaizenStore.setEditDocumentId(null);
    }
    setOpen(openPanel);
  };

  return (
    <>
      <header className="bg-white shadow flex justify-between">
        <div className="flex justify-between w-10/12 items-center px-2 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Journal Kaizen Usine
          </h1>
          {recordMetrics && (
            <div className="flex justify-between">
              <h4 className="text-lg tracking-ti</div>ght text-black-600 pr-8">
                Année : <b>{currentYear}</b>
              </h4>
              <h4 className="text-md tracking-tight text-orange-600 pr-8">
                Points Ouvert : <b>{recordMetrics.openRecords}</b>
              </h4>
              <h4 className="text-md tracking-tight text-green-700">
                Points Fermé : <b>{recordMetrics.closedRecords}</b>
              </h4>
            </div>
          )}
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
              <Suspense fallback={<EditKaizenFallback />}>
                <EditPanel open={open} setOpen={openSidePanel} />
              </Suspense>
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

export default observer(KaizenJournal);
