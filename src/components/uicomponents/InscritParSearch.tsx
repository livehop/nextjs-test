import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { classNames } from "@/infra/utils/classNames";
import { useStore } from "@/infra/stores/Store";
import { useDebounceValue } from "usehooks-ts";
import { IdValue } from "@/infra/models/IdValue";
import { observer } from "mobx-react-lite";
import {
  FieldValues,
  RegisterOptions,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import { KaizenDocument } from "@/infra/models";

type InscritParSearchProps = ComponentPropsWithoutRef<"input"> & {
  register?: UseFormRegisterReturn<string>;
  options?: RegisterOptions<FieldValues, string>;
  setValue: UseFormSetValue<KaizenDocument>;
  showLabel?: boolean;
};
const InscritParSearch = ({
  setValue,
  register,
  showLabel = true,
  ...rest
}: InscritParSearchProps) => {
  const { employeeStore, kaizenStore } = useStore();
  const { editDocument } = kaizenStore;
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [debouncedQuery, setDebouncedQuery] = useDebounceValue("", 1000);

  // useEffect(() => {
  //   employeeStore.loadIdValues();
  // }, [employeeStore]);

  useEffect(() => {
    employeeStore.loadIdValues(debouncedQuery);
  }, [debouncedQuery, employeeStore]);

  const filteredPeople =
    query === ""
      ? employeeStore.idValues
      : employeeStore.idValues.filter((person) => {
          return person.value.toLowerCase().includes(query.toLowerCase());
        });

  const getDisplayValue = (person: IdValue) => {
    if (editDocument != null && person === null) {
      setValue("focalId", editDocument.focalId);
      setValue("focalContactName", editDocument.focalContactName);
      return editDocument.focalContactName;
    }
    if (person === null) return "";
    setValue("focalId", person.id.toString());
    setValue("focalContactName", person.value);
    return person.value;
  };
  return (
    <>
      <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
        {showLabel && (
          <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
            Point focal
          </Combobox.Label>
        )}
        <div className="relative mt-1">
          <Combobox.Input
            {...register}
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            onChange={(event) => {
              setQuery(event.target.value);
              setDebouncedQuery(event.target.value);
            }}
            displayValue={(data: IdValue | any) => {
              if (data === null) return "";
              const person = data as IdValue;
              const value = getDisplayValue(person);
              return value;
            }}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {filteredPeople.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.id}
                  value={person}
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
                        {person.value}
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
    </>
  );
};

export default observer(InscritParSearch);
