import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SlideMenu from "./SlideMenu";

export default function Layout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <SlideMenu />
      <div className="drawer-content flex flex-col">
        <div>
          <div className="navbar bg-white shadow-sm flex justify-end">
            <Navbar />
          </div>
        </div>
      
        <Outlet />
      </div>
    </div>
  );
}
