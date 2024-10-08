"use client";
import ColumnHeader from "@/components/kaizenjournal/table-ui/column-header";
import { useStore } from "@/infra/stores/Store";
import { isColumnVisible } from "@/lib/utils/arrayutils";
import { observer } from "mobx-react-lite";

import React, { use, useEffect } from "react";

type SingleColHeaderProps = {
  title: string;
};

const SingleColHeader = ({ title }: SingleColHeaderProps) => {
  const { columnStore } = useStore();
  const { columns } = columnStore;

  return (
    <>
      {isColumnVisible(columns, title) && (
        <th
          className="sticky top-0 border-b border-gray-500  bg-slate-50
                    text-left text-sm 
                    font-semibold text-gray-900"
        >
          <ColumnHeader title={title} />
        </th>
      )}
    </>
  );
};

export default observer(SingleColHeader);
