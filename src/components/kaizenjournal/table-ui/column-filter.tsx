"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { useStore } from "@/infra/stores/Store";
import { DownloadToExcel } from "../DownloadToExcel";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

const ColumnsFilter = () => {
  const { columnStore, kaizenStore } = useStore();
  const { columns, toggleColVisibility } = columnStore;
  return (
    <div className="flex row gap-2">
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={() => {
          DownloadToExcel(kaizenStore.kaizenDocuments?.data!);
        }}
      >
        Excel
        <ArrowDownIcon className="ml-2 h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            Vue
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columns &&
            columns.map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.title}
                  className="capitalize"
                  checked={column.isVisible}
                  onCheckedChange={(value) =>
                    toggleColVisibility(column, !!value)
                  }
                >
                  {column.title}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default observer(ColumnsFilter);
