"use client";
import { KaizenDocument } from "@/infra/models";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import SingleColHeader from "../ui/table/SingleColHeader";
import TwoColHeader from "../ui/table/TwoColHeader";
import FourColHeader from "../ui/table/FourColHeader";
import DataBody from "./DataBody";
import { isColumnVisible } from "@/lib/utils/arrayutils";

const DataSticky = () => {
  const { kaizenStore, columnStore } = useStore();
  const { columns } = columnStore;

  const { loadKaizenDocuments } = kaizenStore;
  useEffect(() => {
    loadKaizenDocuments();
    console.log("Data useEffect");
  }, []);

  return (
    <div className="mt-4 border-2 border-grey-200 pr-4">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <SingleColHeader title="Id" />

            {isColumnVisible(columns, "Équipe") && (
              <SingleColHeader title="Équipe" />
            )}
            <SingleColHeader title="Secteur" />
            <SingleColHeader title="Problème" />
            <TwoColHeader title1="Inscrit Par" title2="Inscrit Date" />
            <TwoColHeader title1="Catégorie" title2="Sous-catégorie" />
            <TwoColHeader title1="Indice" title2="Cote Indice" />
            <SingleColHeader title="Solution" />
            <SingleColHeader title="Point Focal" />

            <FourColHeader
              title1="Suivi"
              title2="Debut"
              title3="Fin Planfié"
              title4="Complété"
            />
            <SingleColHeader title="État" />
            <th
              scope="col"
              className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
            >
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <DataBody />
        </tbody>
      </table>
    </div>
  );
};

export default observer(DataSticky);
