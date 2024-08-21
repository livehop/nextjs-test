"use client";
import ColumnHeader from "@/components/kaizenjournal/table-ui/column-header";
import { useStore } from "@/infra/stores/Store";
import { GetColoredTextClass, isColumnVisible } from "@/lib/utils/arrayutils";
import { observer } from "mobx-react-lite";
import React from "react";

type FourColHeaderProps = {
  title1: string;
  title2: string;
  title3: string;
  title4: string;
};

const FourColHeader = ({
  title1,
  title2,
  title3,
  title4,
}: FourColHeaderProps) => {
  const { columnStore } = useStore();
  const { columns } = columnStore;

  return (
    <>
      {(isColumnVisible(columns, title1) ||
        isColumnVisible(columns, title2) ||
        isColumnVisible(columns, title3) ||
        isColumnVisible(columns, title4)) && (
        <th
          scope="col"
          className="sticky top-0 z-10 border-b border-gray-500 bg-slate-50 text-left text-sm font-semibold text-gray-900"
        >
          {isColumnVisible(columns, title1) && (
            <ColumnHeader title={title1} className={GetColoredTextClass(1)} />
          )}
          {isColumnVisible(columns, title2) && (
            <ColumnHeader title={title2} className={GetColoredTextClass(2)} />
          )}
          {isColumnVisible(columns, title3) && (
            <ColumnHeader title={title3} className={GetColoredTextClass(3)} />
          )}
          {isColumnVisible(columns, title4) && (
            <ColumnHeader title={title4} className={GetColoredTextClass(4)} />
          )}
        </th>
      )}
    </>
  );
};

export default observer(FourColHeader);
