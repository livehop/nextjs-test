"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import { Equipe } from "@/infra/models";

const Equipes = () => {
  const { kaizenStore, equipeStore } = useStore();
  const { equipes } = kaizenStore;
  const { loadEquipe, saveEquipe } = equipeStore;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<Equipe>();

  useEffect(() => {
    kaizenStore.loadEquipes();
  }, []);

  const onSubmit = async (data: FieldValues) => {
    const equipe = data as Equipe;
    console.log("Submitted Equipe " + JSON.stringify(equipe));
    await saveEquipe(equipe).then((data) => {
      kaizenStore.loadEquipes(true);
      reset();
    });

    reset();
  };

  const equipeSelected = (equipeId: number) => {
    console.log("Selected Equipe Id " + equipeId);
    if (isNaN(equipeId) || equipeId === -1) {
      reset();
      return;
    }
    loadEquipe(equipeId).then((data) => {
      if (!data) return;
      reset();
      setValue("nomEquipe", data.nomEquipe);
      setValue("numeroEquipe", data.numeroEquipe);
      setValue("typeEquipe", data.typeEquipe);
      setValue("publicationPath", data.publicationPath);
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
                Add / Update Equipe
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
                Équipe
              </label>
            </div>
            <div className="sm:col-span-2">
              <select
                defaultValue={"Add New Value"}
                {...register("numeroEquipe", {
                  required: "Select an Équipe",
                })}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  equipeSelected(parseInt(e.target.value));
                }}
              >
                <option value="">Add New Value</option>
                {equipes.map((option, index) => (
                  <option key={index} value={option.numeroEquipe}>
                    {option.numeroEquipe} - {option.nomEquipe}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project description */}
          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Numero Equipe
              </label>
            </div>
            <div className="sm:col-span-2">
              <input
                {...register("numeroEquipe", {
                  required: "numeroEquipe is required",
                  validate: (value) =>
                    !isNaN(value) || "Please enter a valid number",
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
              />
              {errors.numeroEquipe && (
                <p className="pt-2 text-xs text-red-600">{`${errors.numeroEquipe.message}`}</p>
              )}
            </div>
          </div>
          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                NomEquipe
              </label>
            </div>
            <div className="sm:col-span-2">
              <input
                {...register("nomEquipe", {
                  required: "NomEquipe is required",
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
              {errors.nomEquipe && (
                <p className="pt-2 text-xs text-red-600">{`${errors.nomEquipe.message}`}</p>
              )}
            </div>
          </div>
          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Type Equipe
              </label>
            </div>
            <div className="sm:col-span-2">
              <input
                {...register("typeEquipe", {
                  required: "Type Equipe is required",
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
              {errors.typeEquipe && (
                <p className="pt-2 text-xs text-red-600">{`${errors.typeEquipe.message}`}</p>
              )}
            </div>
          </div>
          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Publication Path
              </label>
            </div>
            <div className="sm:col-span-2">
              <input
                {...register("publicationPath")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
              {errors.publicationPath && (
                <p className="pt-2 text-xs text-red-600">{`${errors.publicationPath.message}`}</p>
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

export default observer(Equipes);
