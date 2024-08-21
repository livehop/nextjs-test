"use client";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import SingleColHeader from "../ui/table/SingleColHeader";
import TwoColHeader from "../ui/table/TwoColHeader";
import FourColHeader from "../ui/table/FourColHeader";
import DataBody from "./DataBody";
import { isColumnVisible } from "@/lib/utils/arrayutils";
import { Button } from "../ui/button";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { DownloadToExcel } from "./DownloadToExcel";

const DataSticky = () => {
  const { kaizenStore, columnStore } = useStore();
  const { columns } = columnStore;

  //const { loadKaizenDocuments } = kaizenStore;

  // useEffect(() => {
  //   loadKaizenDocuments();
  //   console.log("Data useEffect");
  // }, [loadKaizenDocuments]);

  return (
    <div className="mt-4 rounded-md">
      <table className="min-w-full">
        <thead className="bg-slate-50">
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
              className="sticky top-0 z-10 border-b border-gray-500 bg-slate-50 py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
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
