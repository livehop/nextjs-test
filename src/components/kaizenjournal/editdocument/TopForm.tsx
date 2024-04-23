"use client";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "@/infra/stores/Store";
import FocalPointCombo from "@/components/uicomponents/FocalPointCombo";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { KaizenDocument } from "@/infra/models";
import FocalPointSearch from "@/components/uicomponents/FocalPointSearch";

type TopFormProps = {
  register: UseFormRegister<KaizenDocument>;
  setValue: UseFormSetValue<KaizenDocument>;
  getValues: UseFormGetValues<KaizenDocument>;
};

const TopForm = ({ register, setValue, getValues }: TopFormProps) => {
  const { kaizenStore, equipeStore, secteurStore, employeeStore } = useStore();

  const { editDocument, editDocumentId } = kaizenStore;

  const [mailSent, setMailSent] = useState(false);

  useEffect(() => {
    const equipeId = getValues("equipeId");

    employeeStore.loadIdValues();
    equipeStore.loadIdValues();
    if (equipeId) {
      secteurStore.loadIdValues(equipeId);
    }
  }, [editDocumentId]);

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
  };

  return (
    <>
      <div className="space-y-12 bg-gray-100 p-2 rounded-sm">
        <div className="border-b border-gray-900/10 pb-2">
          <div className="flex justify-end">
            <button
              onClick={sendMail}
              disabled={mailSent}
              type="button"
              className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Mail
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
                      selected={
                        idValue.value === editDocument?.equipe.nomEquipe
                      }
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
                  {...register("secteurId")}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-xs sm:leading-6"
                >
                  {secteurStore.idValues.map((idValue) => (
                    <option
                      value={idValue.id}
                      key={idValue.id}
                      selected={idValue.id === editDocument?.secteur.id}
                    >
                      {idValue.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <FocalPointSearch register={register} setValue={setValue} />
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
