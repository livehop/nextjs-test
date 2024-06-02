"use client";
import { IdValue } from "@/infra/models/IdValue";
import { useStore } from "@/infra/stores/Store";
import { useEffect, useState } from "react";

const useEmployeesFilter = (query: string) => {
  const { employeeStore } = useStore();

  const [searchedEmployees, setSearchedEmployees] = useState<IdValue[]>([]);
  const [searchingEmployees, setSearchingEmployees] = useState(false);

  useEffect(() => {
    if (query === "") return;
    setSearchingEmployees(true);
    employeeStore.loadIdValues().then((values) => {
      if (!values) return;
      setSearchedEmployees(values);
      setSearchingEmployees(false);
    });
  }, [query, employeeStore]);

  return {
    searchedEmployees,
    searchingEmployees,
  };
};

export default useEmployeesFilter;
