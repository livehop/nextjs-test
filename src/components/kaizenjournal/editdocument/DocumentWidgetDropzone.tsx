"use client";
import { KaizenAttachement } from "@/infra/models/Document";
import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type DocumentWidgetDropzoneProps = {
  setFiles: React.Dispatch<
    React.SetStateAction<KaizenAttachement[] | undefined>
  >;
};

export function DocumentWidgetDropzone({
  setFiles,
}: DocumentWidgetDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files

      let myattachments: KaizenAttachement[] = [];

      acceptedFiles.forEach((element) => {
        let attachment: KaizenAttachement = {
          id: 0,
          data: element,
          isProcessing: false,
          size: element.size,
        };
        myattachments.push(attachment);
      });

      console.log("Setting files" + myattachments);

      setFiles((prev) => {
        if (!prev) {
          return myattachments;
        }
        console.log("Appending to previous" + prev);
        let files = [...prev, ...myattachments];
        console.log("Appending to previous" + files.length);
        return files;
      });
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="mt-2 flex justify-center rounded-lg border-2 border-dotted border-red-900 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
              >
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">Drop the files to upload!!!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex justify-center rounded-lg border-2 border border-green-900 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
              >
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">
                Tèlèchargez ou faites et dèposez un fichier ici jusqu&apos;à 20
                Mo
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
