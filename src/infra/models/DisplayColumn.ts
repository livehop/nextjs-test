export type DisplayColumn = {
  title: string;
  isVisible: boolean;
};

export const getDefaultDisplayColumns = () => {
  const columns: DisplayColumn[] = [
    {
      title: "Id",
      isVisible: true,
    },
    {
      title: "Équipe",
      isVisible: true,
    },
    {
      title: "Sectuer",
      isVisible: true,
    },
    {
      title: "Problème",
      isVisible: true,
    },
    {
      title: "Inscrit_Par",
      isVisible: true,
    },
    {
      title: "Inscrit_Date",
      isVisible: true,
    },
    {
      title: "Catégorie",
      isVisible: true,
    },
    {
      title: "Sous-catégorie",
      isVisible: true,
    },
    {
      title: "Indice",
      isVisible: true,
    },
    {
      title: "Cote Indice",
      isVisible: true,
    },
    {
      title: "Solution",
      isVisible: true,
    },
    {
      title: "Point Focal",
      isVisible: true,
    },
    {
      title: "Suivi",
      isVisible: true,
    },
    {
      title: "Debut",
      isVisible: true,
    },
    {
      title: "Fin Planfie",
      isVisible: true,
    },
    {
      title: "Complete",
      isVisible: true,
    },
    {
      title: "État",
      isVisible: true,
    },
  ];

  return columns;
};
