"use client";
import React, { use, useEffect, useState } from "react";
import { FaDownload, FaTrash } from "react-icons/fa6";
import { useStore } from "@/infra/stores/Store";
import { observer } from "mobx-react-lite";
import { KaizenAttachement } from "@/infra/models/Document";
import Link from "next/link";
import { LuSaveAll } from "react-icons/lu";
import { FaUndo } from "react-icons/fa";
import { DocumentWidgetDropzone } from "./DocumentWidgetDropzone";

const UploadDocumentsTab = () => {
  const { documentStore, kaizenStore } = useStore();
  const { uploadFile, loadFiles, downloadFile, deleteFile } = documentStore;

  const [files, setFiles] = useState<KaizenAttachement[]>();

  useEffect(() => {
    loadFiles().then((files) => {
      console.log("Files setting " + files);
      if (files === undefined) return;
      const dbFiles: KaizenAttachement[] = files.map((file) => {
        return {
          id: file.id,
          data: new File([], file.fileName),
          isProcessing: false,
          size: file.size,
        };
      });
      setFiles(dbFiles);
    });
  }, [kaizenStore.editDocumentId]);

  const uploadFiles = async () => {
    if (files) {
      files.forEach(async (file) => {
        file.isProcessing = true;
        if (!file.id) {
          await uploadFile(file.data).then((id) => {
            if (id !== undefined) {
              console.log("File uploaded with id: ", id);
              file.id = id;
            }
          });
        }
        file.isProcessing = false;
        console.log("Files setting " + files);
        setFiles(() => [...files]);
      });
    }
  };

  const downloadAttachment = async (
    id: number,
    fileName: string,
    fileType: string
  ) => {
    const blob = await downloadFile(id);
    if (blob === undefined) return;

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.${fileType}`;
    a.click();
  };

  const deleteAttachment = async (id: number) => {
    const success = await deleteFile(id);
    if (!success) return;
    setFiles((prev) => {
      if (!prev) return prev;
      return prev.filter((file) => file.id !== id);
    });
  };

  const deleteLocalAttachment = async (id: number) => {
    setFiles((prev) => {
      if (!prev) return prev;
      return prev.filter((file) => file.id !== id);
    });
  };

  return (
    <form>
      <div className="space-y-4">
        <div className="border-b border-gray-900/10 pb-6">
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full flex ">
              {/* <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Upload Documents
                            </label> */}
              <div className="w-1/3">
                <DocumentWidgetDropzone setFiles={setFiles} />
              </div>

              <div className="w-2/3 flex flex-col pl-4">
                <div className="flex-none min-w-full h-44 px-4 overflow-auto border-2 rounded-lg border-gray-400 mt-2 mb-2">
                  <table className="w-full text-left border-collapse overflow-y">
                    <thead>
                      <tr>
                        <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                          <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                            Action
                          </div>
                        </th>
                        <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                          <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                            File Name
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="align-baseline">
                      {files &&
                        files.length > 0 &&
                        files.map((file, index) => (
                          <tr key={index} className="border-2">
                            <td
                              translate="no"
                              className="pr-2 font-mono font-medium text-xs leading-6 text-gray-500 whitespace-nowrap dark:text-sky-400"
                            >
                              {file.id ? (
                                <div className="flex gap-2 space-between justify-start items-center m-2">
                                  <Link
                                    href="#"
                                    onClick={() => {
                                      deleteAttachment(file.id);
                                    }}
                                  >
                                    <FaTrash size={15} color="red" />
                                  </Link>
                                  <Link
                                    href="#"
                                    onClick={() => {
                                      downloadAttachment(
                                        file.id,
                                        file.data.name,
                                        file.data.type
                                      );
                                    }}
                                  >
                                    <FaDownload size={15} color="green" />
                                  </Link>
                                </div>
                              ) : (
                                <div className="flex gap-2 space-between justify-center items-center m-2">
                                  {/* <Link
                                    href="#"
                                    onClick={() => {
                                      uploadFiles();
                                    }}
                                  >
                                    <FaSave size={15} color="green" />
                                  </Link> */}
                                  <Link
                                    href="#"
                                    onClick={() => {
                                      deleteLocalAttachment(file.id);
                                    }}
                                  >
                                    <FaUndo size={15} color="red" />
                                  </Link>
                                </div>
                              )}
                            </td>

                            <td
                              translate="no"
                              className="pl-2 font-mono font-medium text-xs leading-6 text-gray-500 whitespace-nowrap dark:text-sky-400"
                            >
                              {file.id ? (
                                <div className="pl-2">
                                  {file.data?.name} - {file.size / 1000} KB
                                  {file.isProcessing ? "- Processing" : ""}
                                </div>
                              ) : (
                                <div className="bg-red-100 pl-2">
                                  * {file.data?.name} - {file.size / 1000} KB
                                  {file.isProcessing ? "- Processing" : ""}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="sm:col-span-2 my-0 text-right">
                  <button
                    onClick={uploadFiles}
                    type="button"
                    className="inline-flex justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                  >
                    <Link
                      className="flex gap-2 items-center justify-center"
                      href="#"
                      onClick={() => {
                        uploadFiles();
                      }}
                    >
                      <LuSaveAll size={15} color="white" />
                      Save All
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default observer(UploadDocumentsTab);
