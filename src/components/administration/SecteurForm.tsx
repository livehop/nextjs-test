"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import { Secteur, SousSecteur } from "@/infra/models";
import { useToast } from "../ui/use-toast";
import ConfirmationDialog from "../uicomponents/ConfirmationDialog";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa6";

type SecteurDto = {
  secteur: Secteur;
  sousSecteur: SousSecteur;
};

const SecteurForm = () => {
  const router = useRouter();
  const { kaizenStore, secteurStore } = useStore();
  const { loadEquipes, equipes } = kaizenStore;
  const {
    loadSecteurs,
    loadSecteur,
    resetSecteurs,
    secteurs,
    sousSecteurs,
    loadSousSecteur,
    loadSousSecteurs,
    saveSecteur,
    saveSousSecteur,
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
    getValues,
    control,
  } = useForm<SecteurDto>({
    defaultValues: {
      secteur: {
        desuet: 0, // Set the default value for the radio button
      },
      sousSecteur: {
        desuet: 0, // Set the default value for the radio button},
      },
    },
  });

  const [currentSecteur, setCurrentSecteur] = useState("");

  useEffect(() => {
    loadEquipes();
  }, [loadEquipes]);

  const getBooleanValue = (value: string | boolean) => {
    if (value === "true") return true;
    if (value === "false") return false;

    return Boolean(Number(value));
  };

  const handleConfirm = async () => {
    const secteurDto = formData as SecteurDto;
    secteurDto.secteur.desuet = selectedSecteurOption;
    console.log(
      "Submitted SecteurDto " + Boolean(Number(secteurDto.secteur.desuet))
    );
    const equipeId = secteurDto.secteur.equipe.id;

    await saveSecteur(secteurDto.secteur);

    if (secteurDto.sousSecteur.description !== "") {
      secteurDto.sousSecteur.desuet = selectedSousSecteurOption;
      secteurDto.sousSecteur.equipeId = equipeId;
      secteurDto.sousSecteur.secteurId = secteurDto.secteur.id;
      await saveSousSecteur(secteurDto.sousSecteur);
    }

    loadSecteurs(equipeId);
    loadSousSecteurs(equipeId, secteurDto.secteur?.id || 0);

    setIsDialogOpen(false);
    toast({
      title: "Succès",
      description: "Vos changements ont été sauvegardés avec succès.",
      variant: "success",
    });
    //reset();
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
      resetSecteurs();
      reset();
      reset({
        secteur: {},
        sousSecteur: {},
      });

      return;
    }
    reset({
      secteur: {},
      sousSecteur: {},
    });
    setValue("secteur.id", 0);
    setValue("secteur.name", "");
    setValue("secteur.desuet", 0);

    setValue("sousSecteur.id", 0);
    setValue("sousSecteur.description", "");
    setValue("sousSecteur.desuet", 0);
    loadSecteurs(equipeId);
  };

  const secteurSelected = (secteurId: number) => {
    console.log("Selected secteur Id " + secteurId);
    if (isNaN(secteurId) || secteurId === 0) {
      setCurrentSecteur("");
      setValue("secteur.id", 0);
      setValue("secteur.name", "");
      setValue("secteur.desuet", 0);

      return;
    }
    setCurrentSecteur(secteurId.toString());
    loadSecteur(secteurId).then((data) => {
      if (!data) return;

      reset();
      setValue("secteur.id", data.id);
      setValue("secteur.name", data.name);
      setValue("secteur.desuet", data.desuet);
      setValue("secteur.equipe.id", data.equipeId);

      setValue("sousSecteur.id", 0);
      setValue("sousSecteur.description", "");
      setValue("sousSecteur.desuet", 0);

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
      setValue("sousSecteur.desuet", data.desuet);
    });
  };

  const selectedSecteurOption = useWatch({
    control,
    name: "secteur.desuet",
  });

  const selectedSousSecteurOption = useWatch({
    control,
    name: "sousSecteur.desuet",
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      >
        <div className="space-y-6 py-6 sm:space-y-0 sm:py-0">
          {/* Project name */}
          <div className="space-y-2 px-4">
            <div className="flex items-center gap-20">
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Équipes
              </label>
              <select
                defaultValue={"Ajouter une nouvelle valeur"}
                {...register("secteur.equipe.id", {
                  required: "Select an Equipe",
                })}
                className="mt-2 block w-60 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  equipesSelected(parseInt(e.target.value));
                }}
              >
                <option value="0">Ajouter une nouvelle valeur</option>
                {equipes.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.numeroEquipe} - {option.nomEquipe}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {secteurs.length == 0 && sousSecteurs.length == 0 ? (
          <div className="flex items-start justify-center">
            <div className="ml-20 flex-1 flex flex-col justify-center gap-6 items-center h-48">
              <FaArrowUp size={40} color="gray" />
              Sélectionnez d'abord l'équipe
            </div>
            <div className="flex-1"></div>
          </div>
        ) : (
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
                      defaultValue={"Ajouter une nouvelle valeur"}
                      {...register("secteur.id", {
                        required: "Select an Secteur",
                      })}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        secteurSelected(parseInt(e.target.value));
                      }}
                    >
                      <option value="0">Ajouter une nouvelle valeur</option>
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
                      État
                    </label>
                  </div>
                  <div className="sm:col-span-2 pt-2 flex gap-6">
                    <div>
                      Actif :
                      <input
                        className="m-2"
                        type="radio"
                        value={0}
                        checked={selectedSecteurOption === 0}
                        onChange={() => setValue("secteur.desuet", 0)}
                      />
                    </div>
                    <div>
                      Inactif :{" "}
                      <input
                        className="m-2"
                        type="radio"
                        value={1}
                        checked={selectedSecteurOption === 1}
                        onChange={() => setValue("secteur.desuet", 1)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {currentSecteur === "" ? (
              <div className="flex-1 flex justify-center gap-10 items-center h-48">
                <FaArrowLeft size={40} color="gray" />
                Sélectionnez le secteur en premier
              </div>
            ) : (
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
                        defaultValue={"Ajouter une nouvelle valeur"}
                        {...register("sousSecteur.id", {
                          required: "Select an Sous Category",
                        })}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          sousSecteurSelected(parseInt(e.target.value));
                        }}
                      >
                        <option value="0">Ajouter une nouvelle valeur</option>
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

                    <div className="sm:col-span-2 flex gap-8 pt-2">
                      <div>
                        <span className="mr-2">Actif :</span>
                        <input
                          type="radio"
                          value={0}
                          checked={selectedSousSecteurOption === 0}
                          onChange={() => setValue("sousSecteur.desuet", 0)}
                        />
                      </div>
                      <div>
                        <span className="mr-2">Inactif :</span>
                        <input
                          type="radio"
                          value={1}
                          checked={selectedSousSecteurOption === 1}
                          onChange={() => setValue("sousSecteur.desuet", 1)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

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
              onClick={() => {
                reset();
                reset({
                  secteur: {},
                  sousSecteur: {},
                });
                setCurrentSecteur("");
                resetSecteurs();
              }}
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

export default observer(SecteurForm);
