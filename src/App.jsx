import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRouter from "./Pages/Admin/AdminRouter";
import AuthRouter from "./Pages/Authentication/AuthRouter";
import Auth from "./helpers/Auth";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={
      <Auth>
        <AdminRouter/>
      </Auth>
      }/>
    <Route path="/auth/*" element={<AuthRouter/>} />
    </Routes>
    </BrowserRouter>
  );
}
