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
      title: "Secteur",
      isVisible: true,
    },
    {
      title: "Problème",
      isVisible: true,
    },
    {
      title: "Inscrit Par",
      isVisible: true,
    },
    {
      title: "Inscrit Date",
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
      title: "Fin Planfié",
      isVisible: true,
    },
    {
      title: "Complété",
      isVisible: true,
    },
    {
      title: "État",
      isVisible: true,
    },
  ];

  return columns;
};
