"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import { Categorie, Equipe, SousCategorie } from "@/infra/models";

type CategorieDto = {
  categorie: Categorie;
  sousCategorie: SousCategorie;
};

const Categories = () => {
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CategorieDto>();

  useEffect(() => {
    loadCategories();
  }, []);

  const onSubmit = async (data: FieldValues) => {
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
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
    >
      <div className="flex items-start justify-center">
        <div className="flex-1 bg-green-50">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between space-x-3">
              <div className="space-y-1">
                <div className="text-base font-semibold leading-6 text-gray-900">
                  Add / Update Category
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
                  Category
                </label>
              </div>
              <div className="sm:col-span-2">
                <select
                  defaultValue={"Add New Value"}
                  {...register("categorie.id", {
                    required: "Select an Équipe",
                  })}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    categorySelected(parseInt(e.target.value));
                  }}
                >
                  <option value="0">Add New Value</option>
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
          </div>
        </div>
        <div className="flex-1 bg-blue-50">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between space-x-3">
              <div className="space-y-1">
                <div className="text-base font-semibold leading-6 text-gray-900">
                  Add / Update Sous Category
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
                  Sous Category
                </label>
              </div>
              <div className="sm:col-span-2">
                <select
                  defaultValue={"Add New Value"}
                  {...register("sousCategorie.id", {
                    required: "Select an Sous Category",
                  })}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    sousCategorySelected(parseInt(e.target.value));
                  }}
                >
                  <option value="0">Add New Value</option>
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

export default observer(Categories);
