import React from "react";
import Login from "./login/Login";
import { Route, Routes } from "react-router-dom";
import Error from "../Error";
import Sign from "./login/Sign";

export default function AuthRouter() {
  return (
    <Routes>

        <Route index element={<Login/>} />
        <Route path="login" element={<Login/>}/>
        <Route path="sign" element={<Sign/>}/>
        <Route path='*' element={<Error/>} />

    </Routes>
  );
}
