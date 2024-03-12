
export type DisplayColumn = {
    title: string
    isVisible: boolean
}


export const getDefaultDisplayColumns = () => {
    const columns: DisplayColumn[] = [
        {
            title: 'Id',
            isVisible: true
        },
        {
            title: 'Equipe',
            isVisible: true
        },
        {
            title: 'Sectuer',
            isVisible: true
        },
        {
            title: 'Problematique',
            isVisible: true
        },
        {
            title: 'Inscrit_Par',
            isVisible: true
        },
        {
            title: 'Inscrit_Date',
            isVisible: true
        },
        {
            title: 'Categorie',
            isVisible: true
        },
        {
            title: 'Sous Categorie',
            isVisible: true
        },
        {
            title: 'Indice',
            isVisible: true
        },
        {
            title: 'Cote Indice',
            isVisible: true
        },
        {
            title: 'Solution',
            isVisible: true
        },
        {
            title: 'Point Focal',
            isVisible: true
        },
        {
            title: 'Suivi',
            isVisible: true
        },
        {
            title: 'Debut',
            isVisible: true
        },
        {
            title: 'Fin Planfie',
            isVisible: true
        },
        {
            title: 'Complete',
            isVisible: true
        },
        {
            title: 'Etat',
            isVisible: true
        }
    ];

    return columns;
}