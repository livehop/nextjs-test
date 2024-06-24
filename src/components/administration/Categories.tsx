"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import { Categorie, Equipe, SousCategorie } from "@/infra/models";
import ConfirmationDialog from "../uicomponents/ConfirmationDialog";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type CategorieDto = {
  categorie: Categorie;
  sousCategorie: SousCategorie;
};

const Categories = () => {
  const router = useRouter();
  const { kaizenStore, categoryStore } = useStore();
  const { equipes } = kaizenStore;
  const {
    loadCategories,
    loadCategorie,
    categories,
    souscategories,
    selectedCategorie,
    loadSousCategories,
    loadSousCategorie,
    saveCategorie,
    saveSousCategorie,
    resetSousCategories,
  } = categoryStore;

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
  } = useForm<CategorieDto>({
    defaultValues: {
      categorie: {
        desuet: 0, // Set the default value for the radio button
      },
      sousCategorie: {
        desuet: 0, // Set the default value for the radio button},
      },
    },
  });

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const onSubmitOld = async (data: FieldValues) => {
    const categoryDto = data as CategorieDto;
    console.log("Submitted categoryDto " + JSON.stringify(categoryDto));
    await saveCategorie(categoryDto.categorie);

    if (categoryDto.sousCategorie.description !== "") {
      categoryDto.sousCategorie.categorieId = categoryDto.categorie.id;
      await saveSousCategorie(categoryDto.sousCategorie);
    }

    loadCategories();
    loadSousCategories(selectedCategorie?.id || 0);

    reset();
  };

  const handleConfirm = async () => {
    if (formData) {
      // Submit form data to the server or perform any other action here
      console.log("Form data submitted:", formData);
      setIsDialogOpen(false);

      const categoryDto = formData as CategorieDto;
      categoryDto.categorie.desuet = selectedCategorieOption;
      await saveCategorie(categoryDto.categorie);

      if (categoryDto.sousCategorie.description !== "") {
        categoryDto.sousCategorie.categorieId = categoryDto.categorie.id;
        categoryDto.sousCategorie.desuet = selectedSousCategorieOption;
        await saveSousCategorie(categoryDto.sousCategorie);
      }

      loadCategories();
      loadSousCategories(selectedCategorie?.id || 0);

      //reset();
      toast({
        title: "Succès",
        description: "Vos changements ont été sauvegardés avec succès.",
        variant: "success",
      });
    }
  };

  const onSubmit = async (data: FieldValues) => {
    setFormData(data);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };
  const categorySelected = (categoryId: number) => {
    console.log("Selected category Id " + categoryId);
    if (isNaN(categoryId) || categoryId === -1) {
      reset();
      return;
    }
    loadCategorie(categoryId).then((data) => {
      if (!data) return;

      reset();
      setValue("categorie.id", data.id);
      setValue("categorie.name", data.name);
      setValue("categorie.ficherIntranet", data.ficherIntranet);
      setValue("categorie.desuet", data.desuet);
      loadSousCategories(data.id);
    });
  };

  const sousCategorySelected = (sousCategoryId: number) => {
    console.log("Selected sousCategoryId Id " + sousCategoryId);
    if (isNaN(sousCategoryId) || sousCategoryId === -1) {
      setValue("sousCategorie.id", 0);
      setValue("sousCategorie.description", "");
      return;
    }
    loadSousCategorie(sousCategoryId).then((data) => {
      if (!data) return;
      setValue("sousCategorie.id", data.id);
      setValue("sousCategorie.description", data.description);
      setValue("sousCategorie.desuet", data.desuet);
    });
  };

  const selectedCategorieOption = useWatch({
    control,
    name: "categorie.desuet",
  });

  const selectedSousCategorieOption = useWatch({
    control,
    name: "sousCategorie.desuet",
  });

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
                    Add / Update Catégorie
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
                    {...register("categorie.id", {
                      required: "Select an Équipe",
                    })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      categorySelected(parseInt(e.target.value));
                    }}
                  >
                    <option value="0">Ajouter une nouvelle valeur</option>
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
                    Name
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <input
                    {...register("categorie.name", {
                      required: "NomEquipe is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                  {errors.categorie?.name && (
                    <p className="pt-2 text-xs text-red-600">{`${errors.categorie.name?.message}`}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    FicherIntranet
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <input
                    {...register("categorie.ficherIntranet", {
                      required: "Ficher Intranet is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                  {errors.categorie?.ficherIntranet && (
                    <p className="pt-2 text-xs text-red-600">{`${errors.categorie?.ficherIntranet?.message}`}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    État
                  </label>
                </div>
                <div className="sm:col-span-2 flex gap-6 pt-2">
                  <div>
                    <span className="mr-2">Actif :</span>
                    <input
                      type="radio"
                      value={0}
                      checked={selectedCategorieOption === 0}
                      onChange={() => setValue("categorie.desuet", 0)}
                    />
                  </div>
                  <div>
                    <span className="mr-2">Inactif :</span>
                    <input
                      type="radio"
                      value={1}
                      checked={selectedCategorieOption === 1}
                      onChange={() => setValue("categorie.desuet", 1)}
                    />
                  </div>
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
                    Add / Update Sous Catégorie
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
                    Sous Catégorie
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <select
                    defaultValue={"Ajouter une nouvelle valeur"}
                    {...register("sousCategorie.id", {
                      required: "Select an Sous Category",
                    })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      sousCategorySelected(parseInt(e.target.value));
                    }}
                  >
                    <option value="0">Ajouter une nouvelle valeur</option>
                    {souscategories.map((option, index) => (
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
                    {...register("sousCategorie.description")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                  {errors.sousCategorie?.description && (
                    <p className="pt-2 text-xs text-red-600">{`${errors.sousCategorie.description?.message}`}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    État
                  </label>
                </div>

                <div className="sm:col-span-2 flex gap-6 pt-2">
                  <div>
                    <span className="mr-2">Actif :</span>
                    <input
                      type="radio"
                      value={0}
                      checked={selectedSousCategorieOption === 0}
                      onChange={() => setValue("sousCategorie.desuet", 0)}
                    />
                  </div>
                  <div>
                    <span className="mr-2">Inactif :</span>
                    <input
                      type="radio"
                      value={1}
                      checked={selectedSousCategorieOption === 1}
                      onChange={() => setValue("sousCategorie.desuet", 1)}
                    />
                  </div>
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

export default observer(Categories);
