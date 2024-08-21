import { RessourcesNecessaire } from "@/infra/models/RessourcesNecessaire";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

const DemandesTab = () => {
  const { kaizenStore, ressourcesStore, userStore } = useStore();
  const {
    resNecessaires,
    upsertResourceNessaicaires,
    editDocumentId,
    loadResourceNessaicaires,
  } = kaizenStore;
  const {
    loadRessourcesValues,
    loadTypeDemandeValues,
    ressourcesValues,
    typeDemandeValues,
  } = ressourcesStore;

  const [ressource, setRessource] = useState("");
  const [typeDemande, setTypeDemande] = useState("");
  const [demandeNo, setDemandNo] = useState("");

  useEffect(() => {
    loadRessourcesValues();
    loadTypeDemandeValues();
  }, [loadRessourcesValues, loadTypeDemandeValues]);

  const updateRessources = async () => {
    if (editDocumentId == null) return;

    const ressourceNessaicaires: RessourcesNecessaire = {
      kaizenId: editDocumentId,
      ressourceId: Number(ressource === "" ? 1 : ressource),
      numeroDemande: demandeNo,
      idType: Number(typeDemande === "" ? 1 : typeDemande),
    };

    await upsertResourceNessaicaires(ressourceNessaicaires);
    loadResourceNessaicaires().then((data) => {
      console.log(
        "loadResourceNessaicaires called  ----> ",
        JSON.stringify(data)
      );
    });
  };

  return (
    <div>
      <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium leading-6 text-gray-900">
            Ressource
          </label>
          <div className="mt-2">
            <select
              disabled={!userStore.isEditable}
              className="pl-2 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
              onChange={(e) => setRessource(e.target.value)}
            >
              {ressourcesValues.map((ressource) => (
                <option key={ressource.id} value={ressource.id}>
                  {ressource.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium leading-6 text-gray-900">
            Type Demande
          </label>
          <div className="mt-2">
            <select
              disabled={!userStore.isEditable}
              className="pl-2 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
              onChange={(e) => setTypeDemande(e.target.value)}
            >
              {typeDemandeValues.map((typeDemande) => (
                <option key={typeDemande.id} value={typeDemande.id}>
                  {typeDemande.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium leading-6 text-gray-900">
            No Demande
          </label>
          <div className="mt-2">
            <input
              disabled={!userStore.isEditable}
              className="pl-2 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
              onChange={(e) => setDemandNo(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="col-span-full flex justify-end mt-4">
        <button
          disabled={!userStore.isEditable}
          onClick={updateRessources}
          type="button"
          className="inline-flex justify-center rounded-sm bg-gray-600 px-2 py-1 text-xs 
                         font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline 
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Enregistrer Demande
        </button>
      </div>
      <div
        id="class-table"
        className="flex-none min-w-full h-32 px-4 overflow-auto border-2 border-gray-400 mt-2"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                <div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">
                  Ressource
                </div>
              </th>
              <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                  Type Demande
                </div>
              </th>
              <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                  No Demande
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="align-baseline">
            {resNecessaires.map((ressourceNecessaire, index) => (
              <tr key={index}>
                <td
                  translate="no"
                  className="py-0 pr-2 font-mono font-medium text-xs leading-6 text-gray-500 whitespace-nowrap dark:text-sky-400"
                >
                  {ressourceNecessaire.ressourceDesc}
                </td>
                <td
                  translate="no"
                  className="py-0 pr-2 font-mono font-medium text-xs leading-6 text-gray-500 whitespace-nowrap dark:text-sky-400"
                >
                  {ressourceNecessaire.idTypeDesc}
                </td>
                <td
                  translate="no"
                  className="py-0 pr-2 font-mono font-medium text-xs leading-6 text-gray-500 whitespace-nowrap dark:text-sky-400"
                >
                  {ressourceNecessaire.numeroDemande}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default observer(DemandesTab);
