"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import ConfirmationDialog from "../uicomponents/ConfirmationDialog";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const CotationConfig = () => {
  const router = useRouter();
  const { categoryStore, cotationsStore } = useStore();
  const { loadCategories, categories, setSelectedCategorie } = categoryStore;

  const { cotationConfigs, loadCotationConfigs, upsertCotationConfig } =
    cotationsStore;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FieldValues | null>(null);
  const { toast } = useToast();

  const [niveauList, setNiveauList] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm();

  const selectedCategory = watch("categorie");
  const cotationName = watch("cotationName");
  const niveau = watch("niveau");

  useEffect(() => {
    loadCategories();
    loadCotationConfigs();
  }, [loadCategories, loadCotationConfigs]);

  useEffect(() => {
    if (selectedCategory <= 0) {
      reset();
      return;
    }
    if (cotationName && selectedCategory) {
      // Filter data based on cotationName and categorie_id
      const filteredData = cotationConfigs
        .filter(
          (item) =>
            item.cotation_Name === cotationName &&
            item.id_Categorie === parseInt(selectedCategory)
        )
        .map((item) => item.niveau);

      // Sort the filtered niveau values in ascending order
      const sortedNiveau = filteredData.sort((a, b) => a - b);

      // Update the niveau options
      setNiveauList(sortedNiveau);

      setValue("niveau", "-1");
      setValue("valeur", "");
    }
  }, [cotationName, selectedCategory, setValue, reset, cotationConfigs]);

  useEffect(() => {
    console.log("Niveau Use Effect called :", niveau);
    if (cotationName && selectedCategory && niveau) {
      // Filter data based on cotationName and categorie_id
      const filteredData = cotationConfigs
        .filter(
          (item) =>
            item.cotation_Name === cotationName &&
            item.id_Categorie === parseInt(selectedCategory) &&
            item.niveau === parseInt(niveau)
        )
        .map((item) => item.valeur);

      if (filteredData.length > 0) {
        setValue("valeur", filteredData[0]);
      }
    }
  }, [niveau, setValue, cotationName, selectedCategory, cotationConfigs]);

  const handleConfirm = async () => {
    if (formData) {
      // Submit form data to the server or perform any other action here
      console.log("Form data submitted:", formData);
      setIsDialogOpen(false);

      upsertCotationConfig({
        id: 0,
        id_Categorie: parseInt(formData.categorie),
        cotation_Name: formData.cotationName,
        niveau: parseInt(formData.niveau),
        valeur: formData.valeur,
      }).then(() => {
        //reset();
        toast({
          title: "Succès",
          description: "Vos changements ont été sauvegardés avec succès.",
          variant: "success",
        });
      });
    }
  };

  const onSubmit = async (data: FieldValues) => {
    console.log("Submitted categoryDto " + JSON.stringify(data));
    setFormData(data);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      >
        <div className="flex items-start justify-center">
          <div className="flex-1">
            {/* Header */}
            <div className="px-4 py-2 sm:px-6">
              <div className="flex items-start justify-between space-x-3">
                <div className="space-y-1">
                  <div className="text-base font-semibold leading-6 text-gray-900">
                    Ajouter/mettre à jour la configuration de la cotation
                  </div>
                </div>
                <div className="flex h-7 items-center"></div>
              </div>
            </div>

            {/* Divider container */}
            <div className="space-y-6 py-6 sm:space-y-0 sm:py-0">
              {/* Project name */}
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    Catégorie
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <select
                    defaultValue={"Ajouter une nouvelle valeur"}
                    {...register("categorie", {
                      required: "Select an Categorie",
                    })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                  >
                    <option value="-1">Ajouter une nouvelle valeur</option>
                    {categories.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name} - {option.ficherIntranet}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    Cotation Name
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <select
                    defaultValue={"Select an option"}
                    {...register("cotationName", {
                      required: "Select an option",
                    })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                  >
                    <option value="-1">Select an option</option>
                    <option value="CatFreq">CatFreq</option>
                    <option value="CatGrav">CatGrav</option>
                    <option value="CatLegal">CatLegal</option>
                    <option value="CatProb">CatProb</option>
                    <option value="SolGain">SolGain</option>
                    <option value="SolCout">SolCout</option>
                    <option value="SolEff">SolEff</option>
                    <option value="SolRisq">SolRisq</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    Niveau
                  </label>
                </div>
                <div className="sm:col-span-2 flex gap-6 pt-2">
                  <select
                    defaultValue={"Select an option"}
                    {...register("niveau", {
                      required: "Select an option",
                    })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                  >
                    <option value="-1">Select an option</option>
                    {niveauList.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    Valeur
                  </label>
                </div>
                <div className="sm:col-span-2 flex gap-6 pt-2">
                  <input
                    {...register("valeur")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center gap-10 items-center h-48">
            {/* <FaArrowLeft size={40} color="gray" /> */}
            Sélectionnez Catégorie, puis Cotation Name et Niveau pour définir la
            Valeur.
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
              onClick={() => {
                setSelectedCategorie(null);
                reset();
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

export default observer(CotationConfig);
