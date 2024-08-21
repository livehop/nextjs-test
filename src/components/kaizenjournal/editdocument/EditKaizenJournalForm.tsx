import { KaizenDocument } from "@/infra/models";
import { Dialog } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useStore } from "@/infra/stores/Store";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TopForm from "./TopForm";
import Tabs from "./Tabs";
import { toast } from "@/components/ui/use-toast";

type EditKaizenJournalFormProps = {
  editDocument: KaizenDocument | null | undefined;
};

const EditKaizenJournalForm = ({
  editDocument,
}: EditKaizenJournalFormProps) => {
  const [submitData, setSubmitData] = useState("");

  const { kaizenStore, userStore } = useStore();
  const { setEditDocumentId, updateKaizenDocument, loadEditDocument } =
    kaizenStore;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<KaizenDocument>({ defaultValues: { ...editDocument } });
  const router = useRouter();

  const onSubmit = async (data: KaizenDocument) => {
    console.log("on submit from the form .....");
    //setSubmitData(JSON.stringify({ data }, null, " "));

    try {
      await updateKaizenDocument(data).then(() => {
        closePanel();
        toast({
          title: "Succès",
          description: "Vos changements ont été sauvegardés avec succès.",
          variant: "success",
        });
      });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  const closePanel = () => {
    router.replace("kaizenjournal", undefined);
    setEditDocumentId(null);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex h-full flex-col overflow-y-scroll shadow-xl"
    >
      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-gray-100 px-2 py-2">
          <div className="flex items-start justify-between space-x-3">
            <div className="space-y-1">
              <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                Modification point kaizen
              </Dialog.Title>
            </div>
            <div className="flex h-7 items-center">
              <button
                type="button"
                className="relative text-gray-900 hover:text-gray-500"
                onClick={() => closePanel()}
              >
                <span className="absolute -inset-2.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        {submitData}
        {/* Divider container */}
        <div className="space-y-2 py-2 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
          {/* Project name */}
          <div className="px-2">
            <TopForm
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
            <Tabs
              register={register}
              getValues={getValues}
              watch={watch}
              setValue={setValue}
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex-shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-100">
        <div className="flex justify-end space-x-3 ">
          <button
            disabled={isSubmitting || !userStore.isEditable}
            type="submit"
            className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm 
                                        font-semibold text-white shadow-sm hover:bg-blue-500
                                         disabled:bg-gray-500 focus-visible:outline focus-visible:outline-2 
                                         focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Soumettre
          </button>
          <button
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => closePanel()}
          >
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
};

export default observer(EditKaizenJournalForm);
