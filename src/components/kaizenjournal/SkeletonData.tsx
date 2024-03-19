import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { isColumnVisible } from '@/lib/utils/arrayutils'
import { useStore } from '@/infra/stores/Store';

const SkeletonData = () => {
    const { columnStore } = useStore();
    const { columns } = columnStore;

    return (
        <>
            {Array.from({ length: 8 }).map((_, index) => (
                <tr key={index}>
                    {isColumnVisible(columns, "Id") && (
                        <td className="text-center whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"> <Skeleton className="h-4" /></td>
                    )}
                    {isColumnVisible(columns, "Equipe") && (
                        <td className="text-center whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            <Skeleton className="h-4" />
                        </td>
                    )}
                    {isColumnVisible(columns, "Sectuer") && (
                        <td className="text-center whitespace-nowrap px-2 py-2 text-sm text-gray-900"> <Skeleton className="h-4" /></td>
                    )}
                    {isColumnVisible(columns, "Problematique") && (
                        <td className="text-sm text-gray-500 max-w-[600px]"> <Skeleton className="h-4" /></td>
                    )}
                    {(isColumnVisible(columns, "Inscrit_Par") || isColumnVisible(columns, "Inscrit_Date")) && (
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {isColumnVisible(columns, "Inscrit_Par") && (
                                <> <Skeleton className="h-4" /> < br /></>
                            )}
                            {isColumnVisible(columns, "Inscrit_Date") && (
                                <> <Skeleton className="h-4" /></>
                            )}
                        </td>
                    )}
                    {(isColumnVisible(columns, "Categorie") || isColumnVisible(columns, "Sous Categorie")) && (
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {isColumnVisible(columns, "Categorie") && (
                                <> <Skeleton className="h-4" /> <br /> </>
                            )}
                            {isColumnVisible(columns, "Sous Categorie") && (
                                <> <Skeleton className="h-4" /></>
                            )}
                        </td>
                    )}
                    {(isColumnVisible(columns, "Indice") || isColumnVisible(columns, "Cote Indice")) && (
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {isColumnVisible(columns, "Indice") && (
                                <> <Skeleton className="h-4" /> <br /> </>
                            )}
                            {isColumnVisible(columns, "Cote Indice") && (
                                <> <Skeleton className="h-4" /></>
                            )}
                        </td>
                    )}
                    {isColumnVisible(columns, "Solution") && (
                        <td className="text-sm text-gray-500 max-w-[600px]"> <Skeleton className="h-4" /></td>
                    )}
                    {isColumnVisible(columns, "Point Focal") && (
                        <td className="px-2 py-2 text-sm text-gray-500"> <Skeleton className="h-4" /></td>
                    )}
                    {(isColumnVisible(columns, "Suivi") || isColumnVisible(columns, "Debut") || isColumnVisible(columns, "Fin Planfie") || isColumnVisible(columns, "Complete")) && (
                        <td className="px-2 py-2 text-xs text-gray-500">
                            {isColumnVisible(columns, "Suivi") && (
                                <>
                                    <Skeleton className="h-4" /><br />
                                </>
                            )}
                            {isColumnVisible(columns, "Debut") && (
                                <>
                                    <Skeleton className="h-4" /><br />
                                </>
                            )}
                            {isColumnVisible(columns, "Fin Planfie") && (
                                <>
                                    <Skeleton className="h-4" /><br />
                                </>
                            )}
                            {isColumnVisible(columns, "Complete") && (
                                <>
                                    <Skeleton className="h-4" />
                                </>
                            )}
                        </td>
                    )}
                    {isColumnVisible(columns, "Etat") && (
                        <td className="text-center px-2 py-2 text-sm text-gray-500">
                            <Skeleton className="h-4" />
                        </td>
                    )}

                    <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Skeleton className="h-4" />
                    </td>
                </tr>
            ))}


        </>


    )
}

export default SkeletonData