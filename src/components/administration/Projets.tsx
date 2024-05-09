"use client";
import { IdValue } from "@/infra/models/IdValue";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

const Projets = () => {
  const { projetStore } = useStore();
  const { idValues, loadIdValues, loadProjet, saveProjet } = projetStore;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<IdValue>();

  useEffect(() => {
    loadIdValues();
  }, []);

  const onSubmit = async (data: FieldValues) => {
    console.log("Submitted Projet........... " + JSON.stringify(data));
    const projet = data as IdValue;
    console.log("Submitted Projet " + JSON.stringify(projet));
    await saveProjet(projet).then((data) => {
      loadIdValues(true);
      reset();
    });

    reset();
  };

  const projetSelected = (projetId: number) => {
    console.log("Selected projetId Id " + projetId);
    if (isNaN(projetId) || projetId === -1) {
      reset();
      return;
    }
    loadProjet(projetId).then((data) => {
      if (!data) return;
      console.log(data);
      reset();
      setValue("id", data.id);
      setValue("value", data.value);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
    >
      <div className="flex-1">
        {/* Header */}
        <div className="bg-gray-50 px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between space-x-3">
            <div className="space-y-1">
              <div className="text-base font-semibold leading-6 text-gray-900">
                Add / Update Projets
              </div>
            </div>
            <div className="flex h-7 items-center"></div>
          </div>
        </div>

        {/* Divider container */}
        <div className="space-y-6 py-6 sm:space-y-0  sm:py-0">
          {/* Project name */}
          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Projets
              </label>
            </div>
            <div className="sm:col-span-2">
              <select
                defaultValue={"Add New Value"}
                {...register("id", {
                  required: "Select an Équipe",
                })}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  projetSelected(parseInt(e.target.value));
                }}
              >
                <option value="0">Add New Value</option>
                {idValues.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Value
              </label>
            </div>
            <div className="sm:col-span-2">
              <input
                {...register("value", {
                  required: "NomEquipe is required",
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
              {errors.value && (
                <p className="pt-2 text-xs text-red-600">{`${errors.value.message}`}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm
                         font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline 
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
                         disabled:bg-gray-500"
          >
            Save
          </button>
          <button
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default observer(Projets);
