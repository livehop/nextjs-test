"use client";
import { KaizenDocument } from "@/infra/models";
import { IdValue } from "@/infra/models/IdValue";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

type SecteursProps = {
  equipeId: number;
  setValue: UseFormSetValue<KaizenDocument>;
};

const Secteurs = ({ equipeId, setValue }: SecteursProps) => {
  const { kaizenStore, secteurStore } = useStore();

  const { editDocument, editDocumentId, loadEditDocument } = kaizenStore;
  const [secteurValues, setSecteurValues] = useState<IdValue[]>([]);

  useEffect(() => {
    console.log(
      "Secteurs useEffect called editDocumentId ------------------- " + equipeId
    );
    console.log(
      "Secteurs useEffect called equipeId------------------- " +
        editDocument?.equipeId
    );
    if (editDocument?.equipeId) {
      secteurStore.loadIdValues(editDocument?.equipeId).then((data) => {
        if (data === undefined) return;
        setSecteurValues(data);
      });
    }
  }, [editDocument?.equipeId, equipeId]);

  const selectSecteur = (e: React.SyntheticEvent<HTMLSelectElement, Event>) => {
    console.log("selectSecteur called " + e.currentTarget.value);
    setValue("secteurId", Number.parseInt(e.currentTarget.value));
  };

  return (
    <div className="sm:col-span-2">
      <label
        htmlFor="postal-code"
        className="block text-xs font-medium text-gray-500"
      >
        Secteurs
      </label>
      <div className="mt-1">
        <select
          onChange={selectSecteur}
          className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-xs sm:leading-6"
        >
          {secteurValues.map((idValue) => (
            <option
              value={idValue.id}
              key={idValue.id}
              selected={idValue.id === editDocument?.secteur.id}
            >
              {idValue.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default observer(Secteurs);
