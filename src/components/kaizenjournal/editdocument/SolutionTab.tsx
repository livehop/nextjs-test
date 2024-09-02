import { KaizenDocument, KaizenEditDocument } from "@/infra/models";
import { useStore } from "@/infra/stores/Store";
import React, { useState } from "react";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";

type SolutionTabProps = {
  register: UseFormRegister<KaizenDocument>;
  getValues: UseFormGetValues<KaizenDocument>;
};

const SolutionTab = ({ register, getValues }: SolutionTabProps) => {
  const { kaizenStore, userStore, cotationsStore } = useStore();
  const { editDocument } = kaizenStore;

  const [mySolGain, setMySolGain] = useState(editDocument?.solGain.toString());
  const [mySolCout, setMySolCout] = useState(editDocument?.solCout.toString());
  const [mySolEff, setMySolEff] = useState(editDocument?.solEff.toString());
  const [mySolRisq, setMySolRisq] = useState(editDocument?.solRisq.toString());

  // ' Calcul de la cote
  // If Not IsNull(RS.Fields("SOL_GAIN").Value) And Not IsNull(RS.Fields("SOL_COUT").Value) And Not IsNull(RS.Fields("SOL_EFF").Value) And Not IsNull(RS.Fields("SOL_RISQ").Value) Then
  //     Cote = (4 * RS.Fields("SOL_GAIN").Value) + (4 - RS.Fields("SOL_COUT").Value) + (4 - RS.Fields("SOL_EFF").Value) + (4 - RS.Fields("SOL_RISQ").Value) + Indice
  //     MultiPage1.pgSolution.lblCote.Caption = Cote
  // End If

  const toNumber = (value: string | number | undefined) => {
    if (typeof value === "string") {
      return parseInt(value);
    }
    return 0;
  };

  const getCote = () => {
    console.log("categorieId : ---> ", editDocument?.categorieId);
    const categorieId = getValues("categorieId");
    const gain = mySolGain !== undefined ? parseInt(mySolGain) : 0;
    const cout = mySolCout !== undefined ? parseInt(mySolCout) : 0;
    const eff = mySolEff !== undefined ? parseInt(mySolEff) : 0;
    const risq = mySolRisq !== undefined ? parseInt(mySolRisq) : 0;

    console.log(
      "getIndice: called " +
        cotationsStore.getTranslatedValue(categorieId, "SolGain", gain) +
        " " +
        cotationsStore.getTranslatedValue(categorieId, "SolCout", cout) +
        " " +
        cotationsStore.getTranslatedValue(categorieId, "SolEff", eff) +
        " " +
        cotationsStore.getTranslatedValue(categorieId, "SolRisq", risq)
    );

    return (
      4 * cotationsStore.getTranslatedValue(categorieId, "SolGain", gain) +
      4 -
      cotationsStore.getTranslatedValue(categorieId, "SolCout", cout) +
      4 -
      cotationsStore.getTranslatedValue(categorieId, "SolEff", eff) +
      4 -
      cotationsStore.getTranslatedValue(categorieId, "SolRisq", risq)
    );
  };

  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-xs font-medium leading-6 text-gray-900"
          >
            Solution
          </label>
          <div className="mt-2">
            <textarea
              disabled={!userStore.isEditable}
              {...register("solution")}
              rows={3}
              className="pl-2 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-xs sm:leading-6"
              defaultValue={editDocument?.solution}
            />
          </div>
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Gain
          </label>
          <div className="mt-1">
            <select
              disabled={!userStore.isEditable}
              {...register("solGain")}
              onChange={(event) => {
                setMySolGain(event.target.value);
              }}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value={1}>$1 K</option>
              <option value={2}>$10 K</option>
              <option value={3}>$100 K</option>
              <option value={4}>$1 M</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className="block text-xs font-medium leading-6 text-gray-900">
            Coût
          </label>
          <div className="mt-1">
            <select
              disabled={!userStore.isEditable}
              {...register("solCout")}
              onChange={(event) => {
                setMySolCout(event.target.value);
              }}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value={1}>$1 K</option>
              <option value={2}>$10 K</option>
              <option value={3}>$100 K</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium leading-6 text-gray-900">
            Effort
          </label>
          <div className="mt-1">
            <select
              disabled={!userStore.isEditable}
              {...register("solEff")}
              onChange={(event) => {
                setMySolEff(event.target.value);
              }}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value={1}>Moins de 10 h</option>
              <option value={2}>Moins de 100 h</option>
              <option value={3}>Plus de 100 h</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="postal-code"
            className="block text-xs font-medium leading-6 text-gray-900"
          >
            Risque
          </label>
          <div className="mt-1">
            <select
              disabled={!userStore.isEditable}
              {...register("solRisq")}
              onChange={(event) => {
                setMySolRisq(event.target.value);
              }}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value={1}>Faible</option>
              <option value={2}>Moyen</option>
              <option value={3}>Grand</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="postal-code"
            className="block text-xs font-medium leading-6 text-gray-900 text-center"
          >
            Cote
          </label>
          <div className="mt-1 text-md text-center align-bottom">
            <h2>{getCote()}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionTab;
