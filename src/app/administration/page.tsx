import Categories from "@/components/administration/Categories";
import CotationConfig from "@/components/administration/CotationConfig";
import Equipes from "@/components/administration/Equipes";
import Projets from "@/components/administration/Projets";
import SecteurForm from "@/components/administration/SecteurForm";
import UserAdministrationForm from "@/components/administration/UserAdministrationForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const Adminstration = () => {
  return (
    <div className="w-full">
      <Tabs
        defaultValue="equipes"
        className="w-[800px] bg-gray-50 border-2 rounded-md mx-auto mt-8"
      >
        <TabsList>
          <TabsTrigger value="equipes">Équipes</TabsTrigger>
          <TabsTrigger value="categorie">
            Catégorie / Sous-catégorie
          </TabsTrigger>
          <TabsTrigger value="projets">Projets</TabsTrigger>
          <TabsTrigger value="secteurs">Secteurs</TabsTrigger>
          <TabsTrigger value="cotationconfigs">Cotation Configs</TabsTrigger>
          <TabsTrigger value="users">User Roles</TabsTrigger>
        </TabsList>
        <TabsContent value="equipes">
          <Equipes />
        </TabsContent>
        <TabsContent value="categorie" className="h-100 p-2">
          <Categories />
        </TabsContent>
        <TabsContent value="projets">
          <Projets />
        </TabsContent>
        <TabsContent value="secteurs">
          <SecteurForm />
        </TabsContent>
        <TabsContent value="cotationconfigs">
          <CotationConfig />
        </TabsContent>
        <TabsContent value="users">
          <UserAdministrationForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Adminstration;
