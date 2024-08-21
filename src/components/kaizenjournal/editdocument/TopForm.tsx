"use client";
import { observer } from "mobx-react-lite";
import React, { use, useEffect, useState } from "react";
import { useStore } from "@/infra/stores/Store";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { KaizenDocument } from "@/infra/models";
import FocalPointSearch from "@/components/uicomponents/FocalPointSearch";
import { SiMinutemailer } from "react-icons/si";
import { toast } from "@/components/ui/use-toast";

type TopFormProps = {
  register: UseFormRegister<KaizenDocument>;
  setValue: UseFormSetValue<KaizenDocument>;
  getValues: UseFormGetValues<KaizenDocument>;
};

const TopForm = ({ register, setValue, getValues }: TopFormProps) => {
  const {
    kaizenStore,
    equipeStore,
    secteurStore,
    employeeStore,
    etatStore,
    userStore,
  } = useStore();

  const { editDocument, editDocumentId } = kaizenStore;

  const [mailSent, setMailSent] = useState(false);

  useEffect(() => {
    employeeStore.loadIdValues();
    equipeStore.loadIdValues();
    etatStore.loadIdValues();
  }, [
    editDocumentId,
    employeeStore,
    equipeStore,
    secteurStore,
    getValues,
    editDocument,
    etatStore,
  ]);

  const equipeSelected = (equipeId: number) => {
    secteurStore.loadIdValues(equipeId);
  };

  const sendMail = async () => {
    console.log("send mail");
    const focalId = getValues("focalId");
    const problem = editDocument?.problematique ?? getValues("problematique");

    const solution =
      kaizenStore.editDocument?.solution ?? getValues("solution");
    kaizenStore.sendMail(focalId, problem, solution);
    console.log("send mail to : " + getValues("focalId"));
    setMailSent(true);
    toast({
      title: "Succès",
      description: "Votre courrier a été envoyé.",
      variant: "success",
    });
  };

  return (
    <>
      <div className="space-y-12 bg-gray-100 p-2 rounded-sm">
        <div className="border-b border-gray-900/10 pb-2">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center">
              <div className="mr-4 block text-xs font-medium text-gray-500">
                Etat
              </div>
              <select
                disabled={!userStore.isEditable}
                {...register("etatId", { required: "Select an Etat" })}
                className=" ml-0 block w-32 rounded-md border-0 py-1 pl-1 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
              >
                <option value="" disabled selected>
                  Sélectionner État
                </option>
                {etatStore.idValues.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={sendMail}
              type="button"
              disabled={mailSent}
              className="inline-flex justify-center rounded-md bg-gray-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className={"flex gap-2 items-center justify-center"}>
                <SiMinutemailer size={15} color="white" />
                Envoyer
              </div>
            </button>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="ID"
                className="block text-xs font-medium text-gray-500"
              >
                ID
              </label>
              <div>
                <h2 className="text-sm font-semibold leading-7 text-gray-900">
                  {editDocumentId}
                </h2>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-xs font-medium text-gray-500"
              >
                Inscrit par
              </label>
              <div>
                <h2 className="text-md font-semibold text-gray-900">
                  {editDocument?.inscritPar}
                </h2>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-500">
                Inscrit le
              </label>
              <div>
                <h2 className="text-sm font-semibold leading-7 text-gray-900">
                  {editDocument?.inscritDate?.split("T")[0]}
                </h2>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-xs font-medium text-gray-500"
              >
                Équipe
              </label>
              <div className="mt-1">
                <select
                  disabled={!userStore.isEditable}
                  {...register("equipeId")}
                  onChange={(e) => {
                    equipeSelected(parseInt(e.target.value));
                  }}
                  autoComplete="Equipe"
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-xs sm:leading-6"
                >
                  {equipeStore.idValues.map((idValue) => (
                    <option
                      value={idValue.id}
                      key={idValue.id}
                      selected={idValue.id === editDocument?.equipeId}
                    >
                      {idValue.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-xs font-medium text-gray-500"
              >
                Secteur
              </label>
              <div className="mt-1">
                <select
                  disabled={!userStore.isEditable}
                  {...register("secteurId")}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-xs sm:leading-6"
                >
                  {secteurStore.idValues.map((idValue) => (
                    <option
                      value={idValue.id}
                      key={idValue.id}
                      selected={idValue.id === editDocument?.secteurId}
                    >
                      {idValue.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <Secteurs setValue={setValue} equipeId={getValues("equipeId")} /> */}

            <div className="sm:col-span-2">
              {userStore.isEditable ? (
                <>
                  <FocalPointSearch register={register} setValue={setValue} />
                </>
              ) : (
                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-xs font-medium text-gray-500"
                  >
                    Point focal
                  </label>
                  {kaizenStore.editDocument?.focalContactName}
                </div>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-500"
              >
                Problème identifié
              </label>
              <div className="mt-1">
                <textarea
                  disabled={!userStore.isEditable}
                  {...register("problematique")}
                  rows={3}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 
                                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                focus:ring-2 focus:ring-inset focus:ring-blue-600 text-xs leading-6"
                  defaultValue={editDocument?.problematique}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(TopForm);
