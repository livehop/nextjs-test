"use client";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import ConfirmationDialog from "../uicomponents/ConfirmationDialog";
import { useToast } from "../ui/use-toast";
import { Projet } from "@/infra/models/Projet";
import { set } from "date-fns";
import { useRouter } from "next/navigation";

const Projets = () => {
  const router = useRouter();
  const { projetStore } = useStore();
  const { idValues, loadIdValues, loadProjet, saveProjet } = projetStore;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FieldValues | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    control,
  } = useForm<Projet>({
    defaultValues: {
      desuet: 0, // Set the default value for the radio button
    },
  });

  useEffect(() => {
    loadIdValues();
  }, [loadIdValues]);

  const onSubmitOld = async (data: FieldValues) => {
    console.log("Submitted Projet........... " + JSON.stringify(data));
    const projet = data as Projet;
    console.log("Submitted Projet " + JSON.stringify(projet));
    await saveProjet(projet).then((data) => {
      loadIdValues(true);
      reset();
    });

    reset();
  };

  const onSubmit = async (data: FieldValues) => {
    setFormData(data);
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (formData) {
      // Submit form data to the server or perform any other action here
      console.log("Form data submitted:", formData);
      setIsDialogOpen(false);

      const projet = formData as Projet;
      projet.desuet = selectedOption;
      console.log("Submitted Projet " + JSON.stringify(projet));
      await saveProjet(projet).then((data) => {
        loadIdValues(true);
        //reset();
      });

      //reset();
      toast({
        title: "Succès",
        description: "Vos changements ont été sauvegardés avec succès.",
        variant: "success",
      });
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
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
      setValue("name", data.name);
      setValue("desuet", data.desuet);
    });
  };

  const selectedOption = useWatch({
    control,
    name: "desuet",
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      >
        <div className="flex-1">
          {/* Header */}
          <div className="px-4 py-2 sm:px-6">
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
          <div className="space-y-2 py-2 sm:space-y-0  sm:py-0">
            {/* Project name */}
            <div className="space-y-2 px-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5 ml-8 p-2">
                  Projets
                </label>
              </div>
              <div className="sm:col-span-2">
                <select
                  defaultValue={"Ajouter une nouvelle valeur"}
                  {...register("id", {
                    required: "Select an Équipe",
                  })}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    projetSelected(parseInt(e.target.value));
                  }}
                >
                  <option value="0">Ajouter une nouvelle valeur</option>
                  {idValues.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2 px-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5 ml-8 p-2">
                  Value
                </label>
              </div>
              <div className="sm:col-span-2">
                <input
                  {...register("name", {
                    required: "NomEquipe is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
                {errors.name && (
                  <p className="pt-2 text-xs text-red-600">{`${errors.name.message}`}</p>
                )}
              </div>
            </div>
            <div className="space-y-2 px-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-4">
              <label className="text-sm font-medium leading-6 text-gray-900 ml-10 pt-2">
                État
              </label>

              <div className="sm:col-span-2 flex gap-6 pt-2">
                <div>
                  <span className="mr-2">Actif :</span>
                  <input
                    type="radio"
                    value={0}
                    checked={selectedOption === 0}
                    onChange={() => setValue("desuet", 0)}
                  />
                </div>
                <div>
                  <span className="mr-2">Inactif :</span>
                  <input
                    type="radio"
                    value={1}
                    checked={selectedOption === 1}
                    onChange={() => setValue("desuet", 1)}
                  />
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
              Réinitialiser
            </button>
            <button
              type="button"
              className="rounded-md bg-red-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => router.replace("/kaizenjournal")}
            >
              Fermer
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

export default observer(Projets);
