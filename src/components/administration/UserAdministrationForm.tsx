"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useToast } from "../ui/use-toast";
import ConfirmationDialog from "../uicomponents/ConfirmationDialog";
import { useRouter } from "next/navigation";
import GenericFocalPointSearch from "../uicomponents/GenericFocalPointSearch";
import { useStore } from "@/infra/stores/Store";
import { EmployeeData } from "@/infra/models";

const UserAdministrationForm = () => {
  const router = useRouter();

  const { employeeStore } = useStore();
  const { loadEmployee, employee, saveEmployee } = employeeStore;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FieldValues | null>(null);
  const { toast } = useToast();

  const [focalId, setFocalId] = useState("");
  const [focalContactName, setFocalContactName] = useState("");
  const [person, setPerson] = useState<EmployeeData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    console.log("load employee details", focalId);
    loadEmployee(focalId).then((data) => {
      if (data !== undefined) {
        console.log("setting employee data", data);
        setPerson(data);
        if (data?.estMembreA !== undefined) {
          setValue("role", data.estMembreA.toString());
        }
      }
    });
  }, [focalId, setValue, loadEmployee]);

  const handleConfirm = async () => {
    if (formData) {
      setIsDialogOpen(false);
      saveEmployee(focalId, formData["role"]).then(() => {
        reset();
        toast({
          title: "Succès",
          description: "Vos changements ont été sauvegardés avec succès.",
          variant: "success",
        });
      });
    }
  };

  const onSubmit = async (data: FieldValues) => {
    setFormData(data);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      >
        <div className="flex items-start justify-center">
          <div className="flex-1">
            {/* Header */}

            {/* Divider container */}
            <div className="space-y-6 py-6 sm:space-y-0 sm:py-0">
              {/* Project name */}
              <div className="ml-8 mt-2 flex items-center justify-start gap-8">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                    Search
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <GenericFocalPointSearch
                    setFocalId={setFocalId}
                    setFocalContactName={setFocalContactName}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center gap-10 items-center h-48">
            {employee && (
              <div>
                <div className="mt-1 border-t border-gray-100">
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Employe Nom
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {employee.prenomEmploye} {employee.nomEmploye}
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Employe Id
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {employee.employeId}
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Remarque Utilizateur Epix
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {employee.remarque} {employee.utilizateurEpix}
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Access
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <select
                        {...register("role")}
                        className="block w-36 rounded-md border-0 py-1 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-200"
                      >
                        <option value="0">Membre A</option>
                        <option value="1">Membre B</option>
                        <option value="2">Admin</option>
                      </select>
                    </dd>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex-shrink-0 border-gray-200 px-4 py-5 sm:px-6">
          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm
                     font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline 
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
                     disabled:bg-gray-500"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => {
                reset();
              }}
            >
              Réinitialiser
            </button>
            <button
              type="button"
              className="rounded-md bg-red-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => router.replace("/kaizenjournal")}
            >
              Fermer
            </button>
          </div>
        </div>
      </form>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default observer(UserAdministrationForm);
