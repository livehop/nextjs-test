import { Note } from "@/infra/models/Note";
import { useStore } from "@/infra/stores/Store";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { use, useEffect, useState } from "react";

const HistoryTab = () => {
  const { kaizenStore } = useStore();
  const { getNotes, notes } = kaizenStore;
  const [myNotes, setMyNotes] = useState<Note[]>([]);

  useEffect(() => {
    getNotes().then((mynotes) => {
      if (mynotes) setMyNotes(toJS(mynotes));
    });
  }, []);

  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Logs
          </label>
          <div
            id="class-table"
            className="flex-none min-w-full h-52 px-4 overflow-auto border-2 border-gray-400"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="sticky z-10 w-36 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                    <div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">
                      Date
                    </div>
                  </th>
                  <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                    <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                      Description
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="align-baseline">
                {notes &&
                  notes.map((note, index) => (
                    <tr key={index}>
                      <td
                        translate="no"
                        className="border-b-2 border-gray-200 py-0 pr-2 font-mono font-medium text-xs leading-6 text-gray-500 whitespace-nowrap dark:text-sky-400"
                      >
                        {note.inscritDate.split("T")[0]}
                      </td>
                      <td
                        translate="no"
                        className="border-b-2 border-gray-200 py-0 pr-2 font-mono font-medium text-sm leading-6 text-gray-800 whitespace-nowrap dark:text-sky-400"
                      >
                        {note.description}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(HistoryTab);
