import { PhotoIcon } from '@heroicons/react/16/solid'
import React from 'react'

const UploadDocumentsTab = () => {
    return (
        <form>
            <div className="space-y-4">
                <div className="border-b border-gray-900/10 pb-6">
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                        <div className="col-span-full">
                            {/* <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Upload Documents
                            </label> */}
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                        >
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">Tèlèchargez ou faites et dèposez un fichier ici jusqu'à 10 Mo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </form>
    )
}

export default UploadDocumentsTab