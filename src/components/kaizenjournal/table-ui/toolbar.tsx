import React, { Suspense, use, useEffect, useState } from "react";
import ColumnsFilter from "./column-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import EquipeFilter from "./equipe-filter";
import SecteurFilter from "./secteur-filter";
import EtatFilter from "./etat-filter";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import { FaPlus } from "react-icons/fa6";
import { useDebounceValue } from "usehooks-ts";
import CategoryFilter from "./category-filter";

type ToolbarProps = {
  openSidePanel: (open: boolean) => void;
};

const Toolbar = ({ openSidePanel }: ToolbarProps) => {
  const { kaizenStore, searchStore } = useStore();
  const {
    problemSearch,
    setProblemSearch,
    solutionSearch,
    setSolutionSearch,
    searchKaizenDocuments,
  } = searchStore;
  const { hasAnyFiltersSet, resetSearchFilters } = kaizenStore;

  const [searchProblem, setSearchProblem] = useState("");
  const [searchSolution, setSearchSolution] = useState("");

  const [debouncedSearchProblem] = useDebounceValue(searchProblem, 1200);
  const [debouncedSearchSolution] = useDebounceValue(searchSolution, 1200);

  useEffect(() => {
    setProblemSearch(debouncedSearchProblem);
    setSolutionSearch(debouncedSearchSolution);
    searchKaizenDocuments();
  }, [
    debouncedSearchProblem,
    debouncedSearchSolution,
    searchKaizenDocuments,
    setProblemSearch,
    setSolutionSearch,
  ]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <label htmlFor="searchProblem" className="my-4 text-sm font-semibold">
            Problème :
          </label>
          <Input
            placeholder="Problème ..."
            value={searchProblem ?? ""}
            onChange={(event) => setSearchProblem(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <label htmlFor="searchProblem" className="text-sm font-semibold">
            Solution:
          </label>

          <Input
            placeholder="Solution ..."
            value={searchSolution ?? ""}
            onChange={(event) => setSearchSolution(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <Suspense fallback={<div>Loading ...</div>}>
            <EquipeFilter />
          </Suspense>
          <SecteurFilter />
          <CategoryFilter />
          <EtatFilter />

          {hasAnyFiltersSet && (
            <Button
              variant="ghost"
              onClick={resetSearchFilters}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <ColumnsFilter />
          <Button onClick={() => openSidePanel(true)} variant="secondary">
            <FaPlus />
            <div className="ml-2">Ajout</div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default observer(Toolbar);
