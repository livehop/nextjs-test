"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import { Secteur, SousSecteur } from "@/infra/models";
import { set } from "date-fns";
import { useToast } from "../ui/use-toast";
import ConfirmationDialog from "../uicomponents/ConfirmationDialog";

type SecteurDto = {
  secteur: Secteur;
  sousSecteur: SousSecteur;
};

const SecteurForm = () => {
  const { kaizenStore, secteurStore } = useStore();
  const { loadEquipes, equipes } = kaizenStore;
  const {
    loadSecteurs,
    loadSecteur,
    secteurs,
    sousSecteurs,
    selectedSecteur,
    loadSousSecteur,
    loadSousSecteurs,
    saveSecteur,
    saveSousSecteur,
    resetSousSecteurs,
  } = secteurStore;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FieldValues | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<SecteurDto>();

  useEffect(() => {
    loadEquipes();
  }, []);

  const getBooleanValue = (value: string | boolean) => {
    if (value === "true") return true;
    if (value === "false") return false;

    return Boolean(Number(value));
  };

  const handleConfirm = async () => {
    const secteurDto = formData as SecteurDto;
    console.log(
      "Submitted SecteurDto " + Boolean(Number(secteurDto.secteur.desuet))
    );
    const equipeId = secteurDto.secteur.equipe.id;

    secteurDto.secteur.desuet = getBooleanValue(secteurDto.secteur.desuet);
    secteurDto.sousSecteur.desuet = getBooleanValue(
      secteurDto.sousSecteur.desuet
    );

    await saveSecteur(secteurDto.secteur);

    if (secteurDto.sousSecteur.description !== "") {
      secteurDto.sousSecteur.equipeId = equipeId;
      secteurDto.sousSecteur.secteurId = secteurDto.secteur.id;
      await saveSousSecteur(secteurDto.sousSecteur);
    }

    loadSecteurs(equipeId);
    loadSousSecteurs(equipeId, secteurDto.secteur?.id || 0);

    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Your changes have been saved",
    });
    reset();
  };

  const onSubmit = async (data: FieldValues) => {
    setFormData(data);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const equipesSelected = (equipeId: number) => {
    console.log("Selected equipeId " + equipeId);
    if (isNaN(equipeId) || equipeId === -1) {
      reset();
      return;
    }
    reset({
      secteur: {},
      sousSecteur: {},
    });
    setValue("secteur.id", 0);
    setValue("secteur.name", "");
    setValue("secteur.desuet", false);

    setValue("sousSecteur.id", 0);
    setValue("sousSecteur.description", "");
    setValue("sousSecteur.desuet", false);
    loadSecteurs(equipeId);
  };

  const secteurSelected = (secteurId: number) => {
    console.log("Selected secteur Id " + secteurId);
    if (isNaN(secteurId) || secteurId === -1) {
      reset();
      return;
    }
    loadSecteur(secteurId).then((data) => {
      if (!data) return;

      reset();
      setValue("secteur.id", data.id);
      setValue("secteur.name", data.name);
      setValue("secteur.desuet", data.desuet);
      setValue("secteur.equipe.id", data.equipeId);

      setValue("sousSecteur.id", 0);
      setValue("sousSecteur.description", "");
      setValue("sousSecteur.desuet", false);

      loadSousSecteurs(data.equipeId, secteurId);
    });
  };

  const sousSecteurSelected = (sousSecteurId: number) => {
    console.log("Selected sousSecteurId Id " + sousSecteurId);
    if (isNaN(sousSecteurId) || sousSecteurId === -1) {
      setValue("sousSecteur.id", 0);
      setValue("sousSecteur.description", "");
      return;
    }
    loadSousSecteur(sousSecteurId).then((data) => {
      if (!data) return;
      setValue("sousSecteur.id", data.id);
      setValue("sousSecteur.description", data.description);
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      >
        <div className="space-y-6 py-6 sm:space-y-0 sm:py-0">
          {/* Project name */}
          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Équipes
              </label>
            </div>
            <div className="sm:col-span-2">
              <select
                defaultValue={"Add New Value"}
                {...register("secteur.equipe.id", {
                  required: "Select an Equipe",
                })}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  equipesSelected(parseInt(e.target.value));
                }}
              >
                <option value="0">Add New Value</option>
                {equipes.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.numeroEquipe} - {option.nomEquipe}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center">
          <div className="flex-1">
            {/* Header */}
            <div className="px-4 py-2 sm:px-6">
              <div className="flex items-start justify-between space-x-3">
                <div className="space-y-1">
                  <div className="text-base font-semibold leading-6 text-gray-900">
                    Add / Update Secteur
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
                    Secteur
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <select
                    defaultValue={"Add New Value"}
                    {...register("secteur.id", {
                      required: "Select an Secteur",
                    })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      secteurSelected(parseInt(e.target.value));
                    }}
                  >
                    <option value="0">Add New Value</option>
                    {secteurs.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    Name
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <input
                    {...register("secteur.name", {
                      required: "NomEquipe is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                  {errors.secteur?.name && (
                    <p className="pt-2 text-xs text-red-600">{`${errors.secteur.name?.message}`}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    Desuet
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <input
                    {...register("secteur.desuet")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                  {errors.secteur?.desuet && (
                    <p className="pt-2 text-xs text-red-600">{`${errors.secteur?.desuet?.message}`}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    État
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <select
                    defaultValue={"Add New Value"}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                  >
                    <option value="">Actif</option>
                    <option value="">Inactif</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            {/* Header */}
            <div className="px-4 py-2 sm:px-6">
              <div className="flex items-start justify-between space-x-3">
                <div className="space-y-1">
                  <div className="text-base font-semibold leading-6 text-gray-900">
                    Add / Update Sous Secteur
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
                    Sous Secteur
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <select
                    defaultValue={"Add New Value"}
                    {...register("sousSecteur.id", {
                      required: "Select an Sous Category",
                    })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      sousSecteurSelected(parseInt(e.target.value));
                    }}
                  >
                    <option value="0">Add New Value</option>
                    {sousSecteurs.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    Desuet
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <input
                    {...register("sousSecteur.desuet")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                  {errors.sousSecteur?.desuet && (
                    <p className="pt-2 text-xs text-red-600">{`${errors.sousSecteur.desuet?.message}`}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    Description
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <input
                    {...register("sousSecteur.description")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                  {errors.sousSecteur?.description && (
                    <p className="pt-2 text-xs text-red-600">{`${errors.sousSecteur.description?.message}`}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    État
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <select
                    defaultValue={"Add New Value"}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                  >
                    <option value="">Actif</option>
                    <option value="">Inactif</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex-shrink-0 border-gray-200 px-4 py-5 sm:px-6">
          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm
                       font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline 
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
                       disabled:bg-gray-500"
            >
              Sauvegarder
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
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default observer(SecteurForm);
