"use client";
import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/infra/stores/Store";
import { useRouter, useSearchParams } from "next/navigation";
import EditKaizenJournalForm from "./editdocument/EditKaizenJournalForm";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface EditPanelProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

const EditPanel = ({ setOpen, open }: EditPanelProps) => {
  const { kaizenStore } = useStore();
  const {
    editDocumentId,
    setEditDocumentId,
    loadEditDocument,
    loadingDocument,
    editDocument,
    loadResourceNessaicaires,
  } = kaizenStore;
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("kaizendocument");

  useEffect(() => {
    loadEditDocument();
    loadResourceNessaicaires();
  }, [search]);

  if (loadingDocument) return;

  const closePanel = () => {
    console.log("closing panel");
    router.replace("kaizenjournal", undefined);
    setEditDocumentId(null);
    setOpen(false);
  };

  const currentDate = new Date().toLocaleDateString();
  return (
    <Transition.Root show={editDocumentId !== null} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closePanel}>
        <div className="fixed inset-0 backdrop-blur-[0px]" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-3xl">
                  {<EditKaizenJournalForm editDocument={editDocument} />}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default observer(EditPanel);
