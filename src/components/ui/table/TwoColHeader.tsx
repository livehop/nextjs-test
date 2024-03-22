"use client";
import ColumnHeader from "@/components/kaizenjournal/table-ui/column-header";
import { useStore } from "@/infra/stores/Store";
import { isColumnVisible } from "@/lib/utils/arrayutils";
import { observer } from "mobx-react-lite";
import React from "react";

type TwoColHeaderProps = {
  title1: string;
  title2: string;
};

const TwoColHeader = ({ title1, title2 }: TwoColHeaderProps) => {
  const { columnStore } = useStore();
  const { columns } = columnStore;

  return (
    <>
      {(isColumnVisible(columns, title1) ||
        isColumnVisible(columns, title2)) && (
        <th
          scope="col"
          className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
        >
          {isColumnVisible(columns, title1) && (
            <ColumnHeader title={title1} className="flex gap-1 items-center" />
          )}
          {isColumnVisible(columns, title2) && (
            <ColumnHeader title={title2} className="flex gap-1 items-center" />
          )}
        </th>
      )}
    </>
  );
};

export default observer(TwoColHeader);
