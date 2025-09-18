import React from "react";

import {Layout, Dashbord,Client,Users,Activite,Operation,OperationMatiere,Odf,EtapeProds,Matiere,} from "./index";
import { Route, Routes } from "react-router-dom";
import Error from "../Error";
import Profil from "./profile/Profil";
import DetailOdf from "./Dashbord/odf/DetailOdf";

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Dashbord />} />
        <Route path="dashboard" element={<Dashbord />} />
        <Route path="client" element={<Client />} />
        <Route path="users" element={<Users />} />
        <Route path="activite" element={<Activite />} />
        <Route path="operation" element={<Operation />} />
        <Route path="matiere" element={<Matiere />} />
        <Route path="etapes_production" element={<EtapeProds />} />
        <Route path="operation_matiere" element={<OperationMatiere />} />
        <Route path="ordre_de_fabrication" element={<Odf />} />
        <Route path="profile" element={<Profil/>} />
        <Route path="ordre_de_fabrication/details_Ordre_de_fabrication/:id" element={<DetailOdf/>} />

      </Route>

      <Route path="*" element={<Error />} />
      
    </Routes>
  );
}
