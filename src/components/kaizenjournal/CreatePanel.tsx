"use client";
import { CreateKaizenDocument, Secteur, SousCategorie } from "@/infra/models";
import { useStore } from "@/infra/stores/Store";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { set, toJS } from "mobx";
import React, { useEffect, useState } from "react";
import FocalPointSearch from "../uicomponents/FocalPointSearch";
import { FieldValues, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { on } from "events";
import InscritParSearch from "../uicomponents/InscritParSearch";

interface CreatePanelProps {
  setOpen: (open: boolean) => void;
}

const CreatePanel = ({ setOpen }: CreatePanelProps) => {
  const { kaizenStore } = useStore();
  const {
    equipes,
    secteurs,
    categories,
    sousCategories,
    loadMeta,
    createKaizenDocument,
  } = kaizenStore;

  const [selectedSecteurs, setSelectedSecteurs] = useState<Secteur[]>([]);
  const [selectedSousCategories, setSelectedSousCatetories] = useState<
    SousCategorie[]
  >([]);

  const [inscritPar, setInscritPar] = useState("");

  useEffect(() => {
    loadMeta().then(() => {
      setSelectedSecteurs(secteurs);
      setSelectedSousCatetories(sousCategories);
    });
    return () => {};
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const inscritRegister = register("inscritpar");
  const equipeRegister = register("equipe", { required: "Select an Équipe" });
  const categorieRegister = register("categorie", {
    required: "Select a Categorie",
  });

  const equipeSelected = (equipeId: number) => {
    console.log("Selected Equipe Id " + equipeId);
    let equipe = equipes.find((equipe) => {
      return equipe.numeroEquipe === equipeId;
    });

    let mysecteurs = secteurs.filter((secteur) => {
      return secteur.equipeId === equipe?.id;
    });

    console.log(toJS(mysecteurs));
    setSelectedSecteurs(mysecteurs);
  };

  const categorySelected = (categoryId: number) => {
    console.log("Selected categoryId " + categoryId);
    let mysousCategories = sousCategories.filter((sousCategorie) => {
      return sousCategorie.categorieId === categoryId;
    });

    console.log(toJS(mysousCategories));
    setSelectedSousCatetories(mysousCategories);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const kaizendocument: CreateKaizenDocument = {
      inscritPar: data.inscritpar,
      equipeId: parseInt(data.equipe),
      secteurId: parseInt(data.secteur),
      problematique: data.problem,
      categorieId: parseInt(data.categorie),
      sousCategorieId: parseInt(data.sousCategorie),
      solution: data.solution,
    };
    await createKaizenDocument(kaizendocument);
    reset();
    setOpen(false);
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
              <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                Ajout d'un point Kaizen
              </Dialog.Title>
              {/* <p className="text-sm text-gray-500">
                                          Some Description
                                      </p> */}
            </div>
            <div className="flex h-7 items-center">
              <button
                type="button"
                className="relative text-gray-400 hover:text-gray-500"
                onClick={() => setOpen(false)}
              >
                <span className="absolute -inset-2.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider container */}
        <div className="space-y-6 py-6 sm:space-y-0  sm:py-0">
          {/* Project name */}
          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Date
              </label>
            </div>
            <div className="text-xs pt-2 sm:col-span-2">{currentDate}</div>
          </div>
          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Inscrit par
              </label>
            </div>
            <div className="sm:col-span-2">
              <InscritParSearch
                register={inscritRegister}
                setValue={setInscritPar}
                showLabel={false}
              />
              {errors.inscritpar && (
                <p className="pt-2 text-xs text-red-600">{`${errors.inscritpar.message}`}</p>
              )}
              {/* <input
                type="text"
                name="project-name"
                id="project-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              /> */}
            </div>
          </div>
          {/* Project description */}
          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Problème
              </label>
            </div>
            <div className="sm:col-span-2">
              <textarea
                {...register("problem", { required: "Problème is required" })}
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
              {errors.problem && (
                <p className="pt-2 text-xs text-red-600">{`${errors.problem.message}`}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Solution
              </label>
            </div>
            <div className="sm:col-span-2">
              <textarea
                {...register("solution", { required: "Solution is required" })}
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
              {errors.solution && (
                <p className="pt-2 text-xs text-red-600">{`${errors.solution.message}`}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Équipe
              </label>
            </div>
            <div className="sm:col-span-2">
              <select
                {...equipeRegister}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  equipeRegister.onChange(e);
                  equipeSelected(parseInt(e.target.value));
                }}
              >
                <option value="" disabled selected>
                  Sélectionner
                </option>
                {equipes.map((option, index) => (
                  <option key={index} value={option.numeroEquipe}>
                    {option.numeroEquipe} - {option.nomEquipe}
                  </option>
                ))}
              </select>
              {errors.equipe && (
                <p className="pt-2 text-xs text-red-600">{`${errors.equipe.message}`}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Secteur
              </label>
            </div>
            <div className="sm:col-span-2">
              <select
                {...register("secteur", { required: "Select a Secteur" })}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
              >
                <option value="" disabled selected>
                  Sélectionner
                </option>

                {selectedSecteurs.map((secteur, index) => (
                  <option key={index} value={secteur.id}>
                    {secteur.name}
                  </option>
                ))}
              </select>
              {errors.secteur && (
                <p className="pt-2 text-xs text-red-600">{`${errors.secteur.message}`}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Catégorie
              </label>
            </div>
            <div className="sm:col-span-2">
              <select
                {...categorieRegister}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  categorieRegister.onChange(e);
                  categorySelected(parseInt(e.target.value));
                }}
              >
                <option value="" disabled selected>
                  Sélectionner
                </option>

                {categories.map((categorie, index) => (
                  <option key={index} value={categorie.id}>
                    {categorie.name}
                  </option>
                ))}
              </select>
              {errors.categorie && (
                <p className="pt-2 text-xs text-red-600">{`${errors.categorie.message}`}</p>
              )}
            </div>
          </div>
          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                Sous-catégorie
              </label>
            </div>
            <div className="sm:col-span-2">
              <select
                {...register("sousCategorie", {
                  required: "Select a Sous-catégorie",
                })}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200 sm:text-sm sm:leading-6"
              >
                <option value="" disabled selected>
                  Sélectionner
                </option>

                {selectedSousCategories.map((sousCategorie, index) => (
                  <option key={index} value={sousCategorie.id}>
                    {sousCategorie.description}
                  </option>
                ))}
              </select>
              {errors.sousCategorie && (
                <p className="pt-2 text-xs text-red-600">{`${errors.sousCategorie.message}`}</p>
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
            Soumettre
          </button>
          <button
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
};

export default observer(CreatePanel);
