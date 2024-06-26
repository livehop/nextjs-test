"use client";
import { useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { classNames } from "@/infra/utils/classNames";
import { useStore } from "@/infra/stores/Store";
import { Equipe } from "@/infra/models";
import { observer } from "mobx-react-lite";

const TestMe = () => {
  const { kaizenStore } = useStore();
  const { equipes, loadEquipes, loading, activeEquipe, setActiveEquipe } =
    kaizenStore;
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadEquipes();
  }, [loadEquipes]);

  const filteredEquipes =
    query === ""
      ? equipes
      : equipes.filter((equipe) => {
          return equipe.nomEquipe.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={activeEquipe}
      onChange={(e) => setActiveEquipe(e)}
    >
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Equipe
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(equipe: Equipe) => equipe?.nomEquipe}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredEquipes.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {equipes.map((equipe) => (
              <Combobox.Option
                key={equipe.numeroEquipe}
                value={equipe.nomEquipe}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-blue-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {equipe.nomEquipe}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-blue-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default observer(TestMe);
